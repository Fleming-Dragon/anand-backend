const nodemailer = require("nodemailer");
const config = require("../config/config");

// Create reusable transporter
const createTransporter = () => {
  if (!config.EMAIL_USER || !config.EMAIL_PASS) {
    console.warn(
      "Email credentials not configured. Email functionality will be disabled."
    );
    return null;
  }

  return nodemailer.createTransporter({
    service: config.EMAIL_SERVICE,
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
  });
};

// Send contact form notification to admin
const sendContactNotification = async (contact) => {
  const transporter = createTransporter();
  if (!transporter) return;

  const mailOptions = {
    from: config.EMAIL_FROM,
    to: config.EMAIL_USER, // Send to admin
    subject: `New Contact Form Submission - ${contact.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B4513;">New Contact Form Submission</h2>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone || "Not provided"}</p>
          <p><strong>Subject:</strong> ${contact.subject}</p>
          <p><strong>Type:</strong> ${contact.type}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-left: 4px solid #DAA520; margin: 10px 0;">
            ${contact.message}
          </div>
          <p><strong>Submitted:</strong> ${new Date(
            contact.createdAt
          ).toLocaleString()}</p>
          <p><strong>IP Address:</strong> ${contact.ipAddress}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This is an automated message from Anand Agro Industry website contact form.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Contact notification email sent successfully");
  } catch (error) {
    console.error("Error sending contact notification email:", error);
    throw error;
  }
};

// Send confirmation email to customer
const sendContactConfirmation = async (contact) => {
  const transporter = createTransporter();
  if (!transporter) return;

  const mailOptions = {
    from: config.EMAIL_FROM,
    to: contact.email,
    subject: "Thank you for contacting Anand Agro Industry",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #DAA520; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Anand Agro Industry</h1>
          <p style="margin: 5px 0;">Natural Sweetness of Tradition</p>
        </div>
        
        <div style="padding: 30px 20px;">
          <h2 style="color: #8B4513;">Thank you for reaching out!</h2>
          
          <p>Dear ${contact.name},</p>
          
          <p>We have received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you within 24-48 hours.</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B4513; margin-top: 0;">Your Message Details:</h3>
            <p><strong>Subject:</strong> ${contact.subject}</p>
            <p><strong>Message:</strong> ${contact.message}</p>
            <p><strong>Submitted:</strong> ${new Date(
              contact.createdAt
            ).toLocaleString()}</p>
          </div>
          
          <p>In the meantime, feel free to explore our range of organic, chemical-free jaggery products on our website.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${
              config.FRONTEND_URL
            }/products" style="background-color: #DAA520; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">View Our Products</a>
          </div>
          
          <p>Best regards,<br>
          The Anand Agro Industry Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          
          <div style="text-align: center; color: #666; font-size: 14px;">
            <p><strong>Anand Agro Industry</strong><br>
            Nashik, Maharashtra, India<br>
            Email: ${config.COMPANY_INFO.email}<br>
            Phone: ${config.COMPANY_INFO.phone}</p>
            
            <p style="font-size: 12px; margin-top: 20px;">
              This is an automated confirmation email. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Contact confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending contact confirmation email:", error);
    throw error;
  }
};

// Send welcome email for newsletter subscription (if implemented)
const sendWelcomeEmail = async (email, name) => {
  const transporter = createTransporter();
  if (!transporter) return;

  const mailOptions = {
    from: config.EMAIL_FROM,
    to: email,
    subject: "Welcome to Anand Agro Industry Family!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #DAA520; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Welcome to Anand Agro Industry!</h1>
        </div>
        
        <div style="padding: 30px 20px;">
          <h2 style="color: #8B4513;">Thank you for joining us, ${name}!</h2>
          
          <p>We're delighted to have you as part of the Anand Agro Industry family. You'll now receive updates about our latest organic jaggery products, special offers, and health tips.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${config.FRONTEND_URL}/products" style="background-color: #DAA520; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Shop Now</a>
          </div>
          
          <p>Experience the natural sweetness of tradition with our chemical-free, organic jaggery products!</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
};

module.exports = {
  sendContactNotification,
  sendContactConfirmation,
  sendWelcomeEmail,
};
