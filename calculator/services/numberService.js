const axios = require('axios');
require('dotenv').config();

const baseUrl = 'http://20.244.56.144/evaluation-service';

const apiMap = {
  p: '/primes',
  f: '/fibo',
  e: '/even',
  r: '/rand'
};

async function fetchNumbers(type) {
  try {
    const path = apiMap[type];
    if (!path) throw new Error("Invalid number type");

    const res = await axios.get(`${baseUrl}${path}`, {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`
      },
      timeout: 500
    });

    return res.data.numbers;
  } catch (err) {
    console.error("Fetch error:", err.message);
    return [];
  }
}

module.exports = { fetchNumbers };
