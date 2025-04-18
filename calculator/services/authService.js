const axios = require("axios");
require("dotenv").config();
const fs = require("fs");

async function getAuthToken() {
  try {
    const response = await axios.post("http://20.244.56.144/evaluation-service/auth", {
      email: process.env.EMAIL,
      name: process.env.NAME,
      rollNo: process.env.ROLL_NO,
      accessCode: process.env.ACCESS_CODE,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    console.log("Auth Token:", response.data);

    const token = response.data.access_token;
    const envPath = ".env";
    let envContent = fs.readFileSync(envPath, "utf-8");
    envContent = envContent.replace(/AUTH_TOKEN=.*/g, `AUTH_TOKEN=${token}`);
    fs.writeFileSync(envPath, envContent);

    return response.data;
  } catch (error) {
    console.error("Auth failed:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { getAuthToken };
