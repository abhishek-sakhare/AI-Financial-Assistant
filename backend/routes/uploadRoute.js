import express from "express";
import multer from "multer";
import fs from "fs";
import csv from "csv-parser";

import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);


router.get("/test", async (req, res) => {

   try {

      const model = genAI.getGenerativeModel({
         model: "gemini-2.5-flash",
      });

      const result = await model.generateContent(
         "Hello"
      );

      const response =
         await result.response.text();

      res.json({
         message: response,
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         error: error.message,
      });
   }
});



router.post(
  "/upload",
  upload.single("file"),

  async (req, res) => {

    const results = [];

    fs.createReadStream(req.file.path)

      .pipe(csv())

      .on("data", (data) => {
        results.push(data);
      })

      .on("end", async () => {

        try {

          const model =
            genAI.getGenerativeModel({
              model: "gemini-2.5-flash",
            });

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

          const result =
            await model.generateContent(prompt);

          const response =
            result.response.text();

          res.json({
            success: true,
            analysis: response,
            transactions: results,
          });

        } catch (error) {

          console.log(error);

          res.status(500).json({
            success: false,
            message: "Error generating analysis",
          });
        }
      });
  }
);

export default router;