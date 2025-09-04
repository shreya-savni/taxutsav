import crypto from "crypto";

// Same as in your backend .env
const RAZORPAY_SECRET = "your_key_secret";

// Use IDs from Step 1
const razorpay_order_id = "order_R45y2dhyn8Cc2n";
const razorpay_payment_id = "pay_test_123456";

// Create signature
const signature = crypto
    .createHmac("sha256", RAZORPAY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

console.log({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature: signature,
    localOrderId: "689a1bc397101906932b76d3",
});
