
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { generateEmbeddings } = require("../services/embedding");
const Document = require("../models/Document");

const router = express.Router();

// Multer configuration for handling file uploads
const upload = multer();

// Token limit for embedding generation
const TOKEN_LIMIT = 1000; // Adjust based on the embedding service

// Function to chunk text into manageable parts
function chunkText(text, chunkSize) {
	const words = text.split(" ");
	const chunks = [];
  
	for (let i = 0; i < words.length; i += chunkSize) {
	  chunks.push(words.slice(i, i + chunkSize).join(" "));
	}
  
	return chunks;
  }

router.post("/", async (req, res) => {
try {
	const contentType = req.headers["content-type"];
	const metadata = req.headers["x-metadata"] ? JSON.parse(req.headers["x-metadata"]) : {};

	if (contentType === "application/pdf") {
	const pdfBuffer = req.body; // `body` is raw binary because of `express.raw`
	const pdfData = await pdfParse(pdfBuffer);

	const combinedText = pdfData.text;

	if (!combinedText) {
		return res.status(400).json({ error: "The uploaded PDF does not contain any text." });
	}

	// Chunk text if it exceeds the token limit
	const chunks = chunkText(combinedText, TOKEN_LIMIT);

	// Process each chunk and save embeddings incrementally
	for (const chunk of chunks) {
		const embeddings = await generateEmbeddings(chunk);
		const embeddingValues = embeddings.values;

		if (!embeddingValues.every(item => typeof item === "number")) {
		throw new Error("All elements in the embedding array should be numbers.");
		}

		// Save each chunk's embeddings
		const document = new Document({
		content: chunk,
		embeddings: embeddingValues,
		metadata,
		});
		await document.save();
	}

	res.status(200).json({
		message: "PDF processed successfully!",
	});
	}
	else if(contentType === "application/json"){
		const { content, metadata } = req.body;

		// Validate content
		if (!content || !metadata) {
		  return res.status(400).json({ error: "Content and metadata are required." });
		}
	
		// Generate embeddings
		const embeddings = await generateEmbeddings(content);
	
		// Assuming embeddings.values is the array of numbers you need
		const embeddingValues = embeddings.values;
	
		// Optional: Validate that embeddingValues is an array of numbers
		const isValid = embeddingValues.every(item => typeof item === 'number');
		if (!isValid) {
		  throw new Error('All elements in the embedding array should be numbers');
		}
	
		// Save to MongoDB
		const document = new Document({ content, embeddings: embeddingValues, metadata });
		await document.save();
	
		res.status(200).json({
		  message: "Document ingested successfully!",
		  documentId: document._id,  
		  embeddingsSummary: embeddingValues.slice(0, 10)  
		});
	} else {
	return res.status(400).json({ error: "Unsupported content type. Please upload a valid PDF." });
	}
} catch (error) {
	console.error(error);
	res.status(500).json({ error: "Failed to process the document." });
}
});

module.exports = router;
