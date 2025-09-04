//token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OWUxNTJhMjQzYmUxNDdhMmMwMWY0MSIsImlhdCI6MTc1Njk2OTg3MywiZXhwIjoxNzU3MDU2MjczfQ.JR-QhCCtrc8Ebzn513FZmBz4naceTWq7hFoPwniQYVM"
import express from "express";
const router = express.Router();

// Render payment page
router.get("/pay", (req, res) => {
    res.render("payment", {
        RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    });
});

export default router;






