const express = require("express");
const router = express.Router();

// Import shared chatbot settings
const chatbotSettings = require("../services/customization");

// POST /api/customize
router.post("/", (req, res) => {
    const { parameters } = req.body;

    if (!parameters) {
        return res.status(400).json({
            status: "error",
            message: "Parameters are required."
        });
    }

    // Update the chatbot settings object
    Object.assign(chatbotSettings, parameters);

    return res.status(200).json({
        status: "success",
        message: "Chatbot customization applied.",
        settings: chatbotSettings
    });
});

module.exports = router;
