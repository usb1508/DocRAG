const express = require("express");
const router = express.Router();
const { searchRelevantDocuments } = require("../services/retrieval");
const { generateResponse } = require("../services/generation");

// POST /api/query
router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    // Retrieve relevant documents
    const relevantDocs = await searchRelevantDocuments(question);

	// Generate response
    const response = await generateResponse(question, relevantDocs);

    res.status(200).json({ answer: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process query." });
  }
});

module.exports = router;
