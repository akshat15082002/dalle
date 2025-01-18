import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";

const router = express.Router();

router.route("/create-ai-image").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt);
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta2/models/gemini:generateImage",
      {
        prompt: prompt,
        size: "512x512",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const imageUrl = response.data.image_url;
    console.log(imageUrl);
    res.status(200).json({ image: imageUrl });
  } catch (error) {
    console.error("Error Message:", error.message);
    console.error("Error Code:", error.code);
    console.error("Request Data:", error.config?.data);
    console.error("Response Data:", error.response?.data);
    console.error("Status Code:", error.response?.status);
    res
      .status(500)
      .send( "Something went wrong");
  }
});

export default router;
