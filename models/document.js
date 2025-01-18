const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  embeddings: { type: [Number], required: true },
  metadata: { type: Object, default: {} },
});

module.exports = mongoose.model("Document", DocumentSchema);
