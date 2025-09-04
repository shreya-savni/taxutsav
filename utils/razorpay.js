import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config(); // make sure env vars are loaded

console.log("?? RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID); // debug
console.log("?? RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "Loaded" : "Missing");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;



