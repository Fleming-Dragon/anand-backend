const axios = require("axios");

// Test contact endpoint
const testContactForm = async () => {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    phone: "+91 9876543210",
    subject: "Test Subject",
    message:
      "This is a test message to check the contact form validation and functionality.",
    type: "inquiry",
  };

  try {
    console.log("Testing contact form with data:", testData);

    const response = await axios.post(
      "http://localhost:5000/api/contact",
      testData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Success:", response.data);
  } catch (error) {
    console.error("❌ Error Details:");
    console.error("Status:", error.response?.status);
    console.error("Status Text:", error.response?.statusText);
    console.error("Response Data:", error.response?.data);

    if (error.response?.data?.errors) {
      console.error("Validation Errors:");
      error.response.data.errors.forEach((err, index) => {
        console.error(
          `  ${index + 1}. Field: ${err.path || err.param}, Message: ${err.msg}`
        );
      });
    }
  }
};

// Test with empty phone (should work)
const testContactFormNoPhone = async () => {
  const testData = {
    name: "Test User 2",
    email: "test2@example.com",
    phone: "", // Empty phone
    subject: "Test Subject 2",
    message: "This is another test message without phone number.",
    type: "support",
  };

  try {
    console.log("\n\nTesting contact form without phone:", testData);

    const response = await axios.post(
      "http://localhost:5000/api/contact",
      testData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Success:", response.data);
  } catch (error) {
    console.error("❌ Error Details:");
    console.error("Status:", error.response?.status);
    console.error("Response Data:", error.response?.data);

    if (error.response?.data?.errors) {
      console.error("Validation Errors:");
      error.response.data.errors.forEach((err, index) => {
        console.error(
          `  ${index + 1}. Field: ${err.path || err.param}, Message: ${err.msg}`
        );
      });
    }
  }
};

// Run tests
testContactForm().then(() => {
  testContactFormNoPhone();
});
