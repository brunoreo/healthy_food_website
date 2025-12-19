const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// <-- Paste your OpenRouter key here -->
const OPENROUTER_KEY = "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";

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
          "Authorization": `Bearer ${OPENROUTER_KEY}`,
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

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
