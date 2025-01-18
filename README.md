
# Personalized Chatbot API with RAG, Vector Database, and LLM Integrations

This project provides a highly flexible and efficient API for creating personalized chatbots tailored to your specific requirements. Powered by Retrieval-Augmented Generation (RAG), vector database technology, and cutting-edge Large Language Models (LLMs), the API allows users to ingest their own data, query it intelligently, and receive context-aware, personalized responses.

---

## Features

- **Data Ingestion**: Easily upload and index your custom data into a vector database.
- **Contextual Responses**: Leverages RAG techniques to provide precise answers based on your data.
- **Vector Database Integration**: Ensures fast and scalable retrieval of embeddings.
- **LLM-Powered**: Uses embeddings and outputs from Large Language Models for human-like conversational experiences.
- **Customizable Chatbots**: Build a chatbot that aligns specifically with your domain or business needs.

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/usb1508/DocRAG.git
   cd DocRAG
   ```

2. **Install Dependencies:**
   Make sure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

3. **Set Environment Variables:**
   Create a `.env` file in the project root directory and define the following variables:

   ```env
   PORT=5001
   MONGO_URI=<your-vector-database-url>
   GOOGLE_API_KEY=<your-vector-database-api-key>
   ```

4. **Start the Server:**

   ```bash
   npm start
   ```

   The API will run on `http://localhost:5001` by default (or the port you define).

---

## API Endpoints

### 1. **Ingest Data**

Uploads and indexes your data into the vector database.

- **Endpoint:** `POST /api/ingest`
- **Request Body:**
  ```json
  {
    "content": "<your-data-as-string-or-json>",
    "metadata": { "key": "value" }
  }
  ```
 
- **Response:**
  ```json
  {
    "message": "Data ingested successfully."
  }
  ```

### 2. **Query Data**

Ask questions based on your ingested data.

- **Endpoint:** `POST /api/query`
- **Request Body:**
  ```json
  {
    "question": "<your-question>",
  }
  ```
- **Response:**
  ```json
  {
    "answer": "<contextual-response-from-llm>"
  }
  ```

### 3. **Customize Chatbot**

Set up chatbot parameters such as tone, domain-specific terminology, or preferred response style.

- **Endpoint:** `POST /api/customize`
- **Request Body:**
  ```json
  {
    "parameters": {
      "tone": "formal",
      "domain": "finance",
      "responseLength": "short"
    }
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Chatbot customization applied.",
	"settings": {
        "tone": "formal",
        "domain": "finance",
        "responseLength": "long"
    }
  }
  ```

---

## Use Cases

1. **Knowledge Management**: Turn your documentation or knowledge base into an intelligent queryable chatbot.
2. **Customer Support**: Provide accurate and domain-specific support to your customers.
3. **Personal Assistant**: Create a personalized assistant for scheduling, reminders, and task management.
4. **Educational Tools**: Enable students to interactively learn and ask questions based on course materials.

---

## Technical Stack

- **Backend**: Node.js with Express.js
- **Database**: Vector Database (MongoDB Atlas)
- **LLM Integration**: Gemini

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Future Enhancements possible

- Support for multi-language queries and responses.
- Support Images,Audio,Video file type
- Enhanced analytics for query patterns and chatbot performance.
- Plug-and-play UI for easier customization and deployment.
- WebSocket integration for real-time updates.

---

## Contact

For inquiries or support, please contact:

- Medium: [@usb1508](https://medium.com/@usb1508)
- LinkedIN: [usb1508](https://www.linkedin.com/in/usb1508/)
