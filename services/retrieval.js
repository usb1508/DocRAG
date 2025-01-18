const Document = require("../models/Document");
const { generateEmbeddings } = require("./embedding");

const searchRelevantDocuments = async (question) => {
  try {
    // Generate embeddings for the question
    const questionEmbedding = await generateEmbeddings(question);

    // Perform the vector search using the $vectorSearch aggregation operator
    const relevantDocs = await Document.aggregate([
      {
        $vectorSearch: {
          index: "vector_index", // Name of the vector index
          queryVector: questionEmbedding.values, // The embedding vector for the question
          path: "embeddings", // Field in the collection that stores the vector embeddings
          limit: 3, // Number of results to retrieve
          numCandidates: 3, // Number of candidates to consider for ANN search
          exact: false, // Set to true for ENN search, false for ANN search
        },
      },

      {
        $project: {
          content: 1, // Include document content
          metadata: 1, // Include metadata
          score: { $meta: "vectorSearchScore" }, // Include the similarity score
        },
      },
    ]);

    // Return the relevant documents along with metadata and scores
    return relevantDocs.map((doc) => ({
      content: doc.content,
      metadata: doc.metadata,
      score: doc.score,
    }));
  } catch (error) {
    console.error("Error retrieving documents:", error);
    throw error;
  }
};

module.exports = { searchRelevantDocuments };
