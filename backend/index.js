import "dotenv/config"; // <-- This loads .env immediately before anything else
import express from "express";
import cors from "cors";

import uploadRoute from "./routes/uploadRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});