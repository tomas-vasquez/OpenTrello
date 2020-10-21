// init. environment variables
const dotenv = require("dotenv");
dotenv.config();

export const apiUrl = process.env.API_URL || "http://localhost:3001";
