import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: false, // debit entries (refund/payout) may not have an order
        },
        type: {
            type: String,
            enum: ["credit", "debit"], // credit = money in, debit = money out
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["pending", "success", "failed"],
            default: "pending",
        },
        paymentId: {
            type: String, // Razorpay payment_id / refund_id / payout_id
            required: true,
            unique: true, // avoid duplicate entries for same Razorpay event
        },
        paymentMethod: {
            type: String, // upi, card, netbanking, refund, payout
        },
    },
    { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
