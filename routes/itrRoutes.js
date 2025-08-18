import express from "express";
import itr from "../models/itr.js";
import User from "../models/User.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// ?? Create (Submit) ITR with auto user data
router.post("/submit", authMiddleware, async (req, res) => {
    try {
        const { financialYear, incomeDetails, deductions, taxPaid, documents } = req.body;

        // 1?? Fetch logged-in user details
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2?? Calculate tax due
        const totalIncome =
            (incomeDetails.salary || 0) +
            (incomeDetails.business || 0) +
            (incomeDetails.otherIncome || 0);

        const totalDeductions =
            (deductions.section80C || 0) +
            (deductions.section80D || 0) +
            (deductions.otherDeductions || 0);

        const taxableIncome = totalIncome - totalDeductions;

        let taxDue = 0;
        if (taxableIncome > 250000 && taxableIncome <= 500000) {
            taxDue = (taxableIncome - 250000) * 0.05;
        } else if (taxableIncome > 500000 && taxableIncome <= 1000000) {
            taxDue = 12500 + (taxableIncome - 500000) * 0.2;
        } else if (taxableIncome > 1000000) {
            taxDue = 112500 + (taxableIncome - 1000000) * 0.3;
        }

        taxDue -= taxPaid;

        // 3?? Create ITR record with user details
        const itr = await ITR.create({
            userId: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            financialYear,
            incomeDetails,
            deductions,
            taxPaid,
            taxDue: Math.max(taxDue, 0),
            documents
        });

        res.status(201).json({
            message: "ITR submitted successfully",
            itr
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// ?? Get all ITRs for logged-in user
router.get("/my-itrs", authMiddleware, async (req, res) => {
    try {
        const itrs = await ITR.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(itrs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// ?? Get single ITR
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const itr = await ITR.findById(req.params.id);
        if (!itr) return res.status(404).json({ message: "ITR not found" });
        res.json(itr);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
