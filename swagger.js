const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const doc = {
  info: {
    title: "National Park Adventures API",
    description: "API for exploring National Parks. Authentication is handled via GitHub OAuth. Visit /auth/login to authenticate.",
  },
  host: isProduction ? "national-park-api-sr58.onrender.com" : `localhost:${process.env.PORT || 3000}`,
  schemes: isProduction ? ["https"] : ["http"],
};

const outputFile = "./swagger.json";
// const endpointsFiles = ["./routes/index.js"];
const endpointsFiles = ["./routes/*.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
