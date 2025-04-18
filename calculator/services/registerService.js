const axios = require("axios");
require("dotenv").config();

async function registerUser() {
  try {
    const response = await axios.post("http://20.244.56.144/evaluation-service/register", {
      email: process.env.EMAIL,
      name: process.env.NAME,
      mobileNo: process.env.MOBILE_NO,
      githubUsername: process.env.GITHUB_USERNAME,
      rollNo: process.env.ROLL_NO,
      collegeName: process.env.COLLEGE_NAME,
      accessCode: process.env.ACCESS_CODE,
    });

    console.log("Registered successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { registerUser };
