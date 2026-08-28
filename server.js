require("dotenv").config();

const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();

const PORT = 3000;

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Allow the server to receive JSON
app.use(express.json());

// Serve your frontend files
app.use(express.static(path.join(__dirname, "..")));

// Test API
app.get("/api/test", (req, res) => {
    res.json({
        message: "AI Accessibility Assistant backend is working!"
    });
});


// Simplify
app.post("/api/simplify", async (req, res) => {
    const { text } = req.body;

    if (!text || text.trim() === "") {
        return res.status(400).json({
            error: "Please provide some text."
        });
    }

    try {
        const response = await client.responses.create({
            model: "gpt-5.6-luna",
            input: [
                {
                    role: "system",
                    content:
                        "Simplify complex text into clear, easy-to-understand language. Keep the original meaning and do not add information."
                },
                {
                    role: "user",
                    content: `Simplify this text:\n\n${text}`
                }
            ]
        });

        res.json({
            result: response.output_text
        });

    } catch (error) {
        console.error("Simplify error:", error);

        res.status(500).json({
            error: "Unable to generate a simplified response."
        });
    }
});


// Summarize
app.post("/api/summarize", async (req, res) => {
    const { text } = req.body;

    if (!text || text.trim() === "") {
        return res.status(400).json({
            error: "Please provide some text."
        });
    }

    try {
        const response = await client.responses.create({
            model: "gpt-5.6-luna",
            input: [
                {
                    role: "system",
                    content:
                        "Summarize the provided text clearly and briefly. Include only the most important information and preserve the original meaning."
                },
                {
                    role: "user",
                    content: `Summarize this text:\n\n${text}`
                }
            ]
        });

        res.json({
            result: response.output_text
        });

    } catch (error) {
        console.error("Summarize error:", error);

        res.status(500).json({
            error: "Unable to generate a summary."
        });
    }
});


// Explain
app.post("/api/explain", async (req, res) => {
    const { text } = req.body;

    if (!text || text.trim() === "") {
        return res.status(400).json({
            error: "Please provide some text."
        });
    }

    try {
        const response = await client.responses.create({
            model: "gpt-5.6-luna",
            input: [
                {
                    role: "system",
                    content:
                        "Explain difficult or technical text using simple, clear language. Break down complicated ideas so they are easier to understand. Keep the explanation accurate and do not add unsupported information."
                },
                {
                    role: "user",
                    content: `Explain this text:\n\n${text}`
                }
            ]
        });

        res.json({
            result: response.output_text
        });

    } catch (error) {
        console.error("Explain error:", error);

        res.status(500).json({
            error: "Unable to generate an explanation."
        });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});