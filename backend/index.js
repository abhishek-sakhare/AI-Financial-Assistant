import "dotenv/config"; // <-- This loads .env immediately before anything else
import express from "express";
import cors from "cors";

import uploadRoute from "./routes/uploadRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // You can safely remove these logs now once it works
  console.log("API Key loaded:", !!process.env.GEMINI_API_KEY); 
});