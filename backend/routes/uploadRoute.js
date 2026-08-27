import express from "express";
import multer from "multer";
import fs from "fs";
import csv from "csv-parser";

import { GoogleGenAI } from "@google/genai";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


// Test Gemini API
router.get("/test", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: "Hello",
    });

    res.json({
      message: response.text,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});


// Upload CSV
router.post(
  "/upload",
  upload.single("file"),

  async (req, res) => {

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const results = [];

    fs.createReadStream(req.file.path)

      .pipe(csv())

      .on("data", (data) => {
        results.push(data);
      })

      .on("end", async () => {

        try {

          // Prompt for Gemini
          const prompt = `
Analyze these bank transactions.

Give:
1. Spending Summary
2. Highest Expenses
3. Saving Suggestions
4. Financial Insights

Transactions:
${JSON.stringify(results)}
`;

          // Send request to Gemini
          const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
          });

          // Get AI response
          const analysis = response.text;

          // Send response to frontend
          res.json({
            success: true,
            analysis: analysis,
            transactions: results,
          });

        } catch (error) {

          console.log(error);

          res.status(500).json({
            success: false,
            message: error.message,
          });
        }
      })

      .on("error", (error) => {

        console.log(error);

        res.status(500).json({
          success: false,
          message: "Error reading CSV file",
        });

      });
  }
);

export default router;