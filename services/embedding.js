const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize GoogleGenerativeAI with the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Embedding function
const generateEmbeddings = async (content, type) => {
  try {
    // Get the embedding model
    const model = genAI.getGenerativeModel({
      model: "text-embedding-004", // Use the appropriate embedding model
    });

    // Generate embeddings for the provided content
    const result = await model.embedContent(content);

    // Return the embedding vector
    return result.embedding;
  } catch (error) {
    console.error("Error generating embeddings:", error.message);
    throw error;
  }
};



module.exports = { generateEmbeddings };
