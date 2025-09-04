import express from "express";
const router = express.Router();

// Render payment page
router.get("/pay", (req, res) => {
    res.render("payment", {
        RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    });
});

export default router;
