const axios = require("axios");

// Test contact endpoint with different phone formats
const testContactFormFixed = async () => {
  const testData = {
    name: "Test User Fixed",
    email: "testfixed@example.com",
    phone: "+91 98765 43210", // Phone with spaces and country code
    subject: "Test Subject Fixed",
    message: "This is a test message to check the fixed phone validation.",
    type: "inquiry",
  };

  try {
    console.log("Testing contact form with fixed validation:", testData);

    const response = await axios.post(
      "http://localhost:5000/api/contact",
      testData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Success Response:");
    console.log("Status:", response.status);
    console.log("Data:", response.data);
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

// Run test
testContactFormFixed();
