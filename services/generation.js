// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const generateResponse = async (question, documents) => {
//   try {
//     // Flatten the array of context documents into a single string
//     const formattedContext = documents.map((doc, index) => {
//       return `Document ${index + 1}:
//         Context: ${doc.content}
//         Metadata: ${JSON.stringify(doc.metadata, null, 2)}`;
//     }).join("\n\n");

//     // Create the prompt
//     const prompt = `
//       Information Sources:
//       ${formattedContext}

//       Question: ${question}
//       Instruction: Answer the question based strictly on the provided context. If the information isn't available, respond with:
//       "Sorry, I don't have knowledge about it. Please ingest knowledge using the ingest API."
//     `;

//     // Generate response
//     const result = await model.generateContent([prompt]);
// 	// console.log(prompt
//     // Assuming result.response.text() provides the generated text
//     return result.response.text(); // Adjust based on the actual API response structure
//   } catch (error) {
//     console.error("Error generating response:", error);
//     throw error;
//   }
// };

// module.exports = { generateResponse };

// Import shared chatbot settings
const chatbotSettings = require("./customization");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateResponse = async (question, documents) => {
    try {
        // Flatten the array of context documents into a single string
        const formattedContext = documents.map((doc, index) => {
            return `Document ${index + 1}:
                Context: ${doc.content}
                Metadata: ${JSON.stringify(doc.metadata, null, 2)}`;
        }).join("\n\n");

        // Incorporate chatbotSettings into the prompt
        const prompt = `
            Information Sources:
            ${formattedContext}

            Chatbot Settings:
            - Tone: ${chatbotSettings.tone}
            - Domain: ${chatbotSettings.domain}
            - Response Length: ${chatbotSettings.responseLength}

            Question: ${question}
            Instruction: Answer the question strictly based on the provided context and adhere to the tone, domain, and response length settings. 
            If the information isn't available, respond with:
            "Sorry, I don't have knowledge about it. Please ingest knowledge using the ingest API."
        `;

        // Generate response
        const result = await model.generateContent([prompt]);

        return result.response.text(); // Adjust based on the actual API response structure
    } catch (error) {
        console.error("Error generating response:", error);
        throw error;
    }
};

module.exports = { generateResponse };
