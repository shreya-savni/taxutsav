import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import Quotation from "../models/quotation.js";

const router = express.Router();
router.post("/create-quotation", authMiddleware, async (req, res) => {
    try {
        const { user_name, email, phone, description, amount, discount, tax, totalAmount, quotationDate } = req.body;
        const quotation = new Quotation({ user_name, email, phone, description, amount, discount, tax, totalAmount, quotationDate });
        await quotation.save();

        res.status(201).json({ message: 'Quotation created', data: quotation });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating quotation',
            error: error.message
        });
    }
});
router.get("/get-quotation", authMiddleware, async (req, res) => {
    try {
        const quotations = await Quotation.find();
        res.status(200).json({ data: quotations });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching quotations',
            error: error.message
        });
    }
});
export default router;