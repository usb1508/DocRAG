const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectMongo = require("./utils/mongo");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.raw({ type: 'application/pdf', limit: '10mb' }));

// Database Connection
connectMongo();

// Routes
const ingestRoutes = require("./routes/ingest");
const queryRoutes = require("./routes/query");
const customizeRoutes = require("./routes/customize");


app.use("/api/ingest", ingestRoutes);
app.use("/api/query", queryRoutes);
app.use("/api/customize",customizeRoutes)

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
