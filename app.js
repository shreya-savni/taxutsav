import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import hraRoutes from "./routes/hraRoutes.js";
import naturePaymentRoutes from "./routes/NaturePaymentRoutes.js";
import tdsRoutes from "./routes/tdsRoutes.js";

import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Set up EJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // folder for ejs files

// Routes
app.use("/api/user", userRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/hra", hraRoutes);
app.use("/api/naturepayment", naturePaymentRoutes);
app.use('/api/tds', tdsRoutes);

// Test EJS Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/pay", (req, res) => {
    res.render("payment"); // looks for views/pay.ejs
});

// Start server
app.listen(process.env.PORT || 3000, () =>
    console.log(`Server running on port ${process.env.PORT || 3000}`)
);
