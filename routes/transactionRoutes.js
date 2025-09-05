import express from "express";
import { createTransaction, getTransactions } from "../controllers/transactionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/createtransactions", authMiddleware, createTransaction);
router.get("/", authMiddleware, getTransactions);

export default router;


