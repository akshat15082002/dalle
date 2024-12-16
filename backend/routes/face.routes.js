import express from 'express';
import dotenv from "dotenv";
import axios from 'axios';

dotenv.config();

const router = express.Router();

async function callHuggingFaceAPI(prompt, retries = 5, delay = 1000) {  // Start with a 1 second delay
    try {
      const response = await axios.post(
        process.env.HF_API_URL,
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
          },
        }
      );
      return response.data; // Return the generated image data
    } catch (error) {
      if (
        error.response &&
        error.response.status === 429 // Status code 429: Too Many Requests
      ) {
        const retryAfter = error.response.headers['retry-after'];
        const retryDelay = retryAfter ? parseInt(retryAfter) * 1000 : delay; // Convert to milliseconds
        console.log(`Rate limit exceeded. Retry after ${retryDelay / 1000} seconds...`);
  
        if (retries === 0) {
          throw new Error("Rate limit exceeded after multiple retries.");
        }
  
        await new Promise(resolve => setTimeout(resolve, retryDelay)); // Wait for the specified retry time
        return callHuggingFaceAPI(prompt, retries - 1, retryDelay); // Retry the request with updated delay
      } else if (
        error.response &&
        error.response.data.error === "Please log in or use a HF access token"
      ) {
        throw new Error("Invalid or missing Hugging Face API token.");
      } else {
        throw new Error(error.response?.data?.error || error.message);
      }
    }
  }

  router.route('/').post(async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const data = await callHuggingFaceAPI(prompt); // Call Hugging Face API to generate the image
        res.status(200).json({ image: data }); // Send back the generated image
    } catch (error) {
        console.error("Error generating image:", error.message);
        res.status(500).json({ error: error.message });
    }
  });

export default router;