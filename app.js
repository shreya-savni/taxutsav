import express from "express";
import dotenv from "dotenv";
import cors from "cors";
<<<<<<< HEAD
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
=======
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import naturePaymentRoutes from "./routes/NaturePaymentRoutes.js";
import tdsRoutes from './routes/tdsRoutes.js';
>>>>>>> personal/main

// Import Routes
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import hraRoutes from "./routes/hraRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js";
import naturePaymentRoutes from "./routes/NaturePaymentRoutes.js";
import tdsRoutes from "./routes/tdsRoutes.js";
import payRoutes from "./routes/payRoutes.js";




// Load env + connect DB
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// EJS setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/hra", hraRoutes);
app.use("/api/quotation", quotationRoutes);
app.use("/api/naturepayment", naturePaymentRoutes);
app.use("/api/tds", tdsRoutes);
app.use("/apipay", payRoutes);




// Test routes
app.get("/", (req, res) => res.send("API is running..."));
app.get("/pay", (req, res) => res.render("payment"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`?? Server running on port ${PORT}`));
