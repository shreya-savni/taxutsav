import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import naturePaymentRoutes from "./routes/naturePaymentRoutes.js";
import tdsRoutes from './routes/tdsRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/quotation", quotationRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/naturepayment", naturePaymentRoutes);
app.use('/api/tds', tdsRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




