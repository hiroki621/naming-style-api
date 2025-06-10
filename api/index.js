const express = require("express");
const app = express();

app.get("/api/japan/2010s/female", (req, res) => {
  res.json({
    average_length: 7.12,
    language_preferences: ["French", "Italian", "English"],
    phonetic_features: {
      preferred_endings: ["a", "ia", "ina", "ille", "ie", "eux"],
      avoid_endings: ["t", "s", "x", "m"]
    },
    semantic_themes: [
      "beauty", "grace", "flowers", "jewels", "romantic love", "queenship", "elegance"
    ],
    structural_preferences: {
      word_count: "1 or 2 words",
      compound_form: false,
      name_types: ["foreign_word", "natural_object", "abstract_concept"]
    },
    notes: "Feminine, elegant, and poetic names with international flavor. Preference for soft sounds and graceful imagery."
  });
});

module.exports = app;
