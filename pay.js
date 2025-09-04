import express from "express";
import Razorpay from "razorpay";

const app = express();
app.use(express.json());

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
    try {
        const options = {
            amount: 400, // INR 4 → 400 paise
            currency: "INR",
            receipt: "rcpt_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to create order");
    }
});

app.listen(3000, () => console.log("Server running at 3000"));
