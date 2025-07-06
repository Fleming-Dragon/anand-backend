const nodemailer = require("nodemailer");
require("dotenv").config();

const testEmailConfiguration = async () => {
  console.log("🔍 Testing Email Configuration...");

  // Check environment variables
  console.log("\n📋 Environment Variables:");
  console.log(`EMAIL_SERVICE: ${process.env.EMAIL_SERVICE}`);
  console.log(`EMAIL_USER: ${process.env.EMAIL_USER}`);
  console.log(`EMAIL_FROM: ${process.env.EMAIL_FROM}`);
  console.log(`COMPANY_EMAIL: ${process.env.COMPANY_EMAIL}`);
  console.log(
    `EMAIL_PASS: ${process.env.EMAIL_PASS ? "Set (hidden)" : "Not set"}`
  );

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    debug: true, // Enable debug logs
    logger: true, // Enable logger
  });

  try {
    // Verify connection
    console.log("\n🔗 Testing SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection successful");

    // Send test email
    console.log("\n📧 Sending test email...");
    const testEmailResult = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.COMPANY_EMAIL,
      subject: "Test Email - Anand Agro Contact System",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #DAA520; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">🧪 Email Test Successful!</h1>
          </div>
          
          <div style="padding: 30px 20px;">
            <h2 style="color: #8B4513;">Email Configuration Working!</h2>
            
            <p>This is a test email to verify your contact form email configuration.</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #8B4513; margin-top: 0;">Configuration Details:</h3>
              <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>From:</strong> ${process.env.EMAIL_FROM}</p>
              <p><strong>To:</strong> ${process.env.COMPANY_EMAIL}</p>
              <p><strong>SMTP User:</strong> ${process.env.EMAIL_USER}</p>
            </div>
            
            <p>✅ If you received this email, your contact form email system is working correctly!</p>
            <p>📧 Contact form submissions will now be sent to: <strong>${
              process.env.COMPANY_EMAIL
            }</strong></p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            
            <p style="color: #666; font-size: 14px;">
              This test was run from your Anand Agro Industry backend server.
            </p>
          </div>
        </div>
      `,
    });

    console.log("✅ Test email sent successfully!");
    console.log(`📧 Message ID: ${testEmailResult.messageId}`);
    console.log(`📬 Check your inbox at: ${process.env.COMPANY_EMAIL}`);
    console.log(
      "\n🎉 Email system is working! Contact form notifications will be delivered."
    );
  } catch (error) {
    console.error("❌ Email test failed:");
    console.error("Error type:", error.code);
    console.error("Error message:", error.message);

    if (error.code === "EAUTH") {
      console.log("\n🔑 Authentication Issue Detected:");
      console.log(
        "1. Make sure you're using an App Password, not your regular Gmail password"
      );
      console.log("2. Enable 2-Factor Authentication on your Gmail account");
      console.log(
        "3. Generate an App Password: https://myaccount.google.com/apppasswords"
      );
      console.log("4. Use the App Password in EMAIL_PASS environment variable");
      console.log("5. Remove any spaces from the App Password");
    } else if (error.code === "ENOTFOUND") {
      console.log("\n🌐 Network Issue:");
      console.log("Check your internet connection");
    } else {
      console.log("\n🔧 Other possible solutions:");
      console.log("1. Check if Gmail is blocking less secure apps");
      console.log("2. Try generating a new App Password");
      console.log("3. Make sure 2FA is enabled on your Gmail account");
    }
  }
};

// Run the test
testEmailConfiguration();
