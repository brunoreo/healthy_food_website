/*
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

// Enable CORS so frontend can access backend
app.use(cors());
app.use(express.json());

// Use environment variable for OpenRouter key
const OPENROUTER_KEY = process.env.OPENROUTER_KEY;

// Root route (optional) to test backend
app.get("/", (req, res) => {
  res.send("HealthyBite backend is running!");
});

// API route for fetching healthier alternatives
app.post("/api/alternative", async (req, res) => {
  const { food } = req.body;
  if (!food) return res.status(400).json({ error: "Food is required" });

  try {
    const prompt = `Suggest a healthier alternative to "${food}" with a short explanation.`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data.choices[0].message.content;
    res.json({ alternative: answer });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Use dynamic port for Render or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

// Enable CORS so frontend can access backend
app.use(cors());
app.use(express.json());

// Use environment variable for OpenRouter key
const OPENROUTER_KEY = process.env.OPENROUTER_KEY;

// Root route (optional) to test backend
app.get("/", (req, res) => {
  res.send("HealthyBite backend is running!");
});

// API route for fetching healthier alternatives
app.post("/api/alternative", async (req, res) => {
  const { food } = req.body;
  if (!food) return res.status(400).json({ error: "Food is required" });

  try {
    const prompt = `Suggest a healthier alternative to "${food}" with a short explanation.`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data.choices[0].message.content;

    // Extract the main suggested alternative (optional: simple regex or just use the full answer)
    // Here we assume the first word/phrase is the alternative for search purposes
    const firstLine = answer.split(".")[0]; // take the first sentence
    const searchQuery = encodeURIComponent(firstLine);

    const bbcLink = `https://www.bbcgoodfood.com/search/recipes?q=${searchQuery}`;

    res.json({ 
      alternative: answer,
      recipeLink: bbcLink
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Use dynamic port for Render or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
