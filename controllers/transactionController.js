// controllers/transactionController.js
import Transaction from "../models/Transaction.js";
import Order from "../models/Order.js";
import razorpay from "../utils/razorpay.js";

// ============================
// Create a transaction (credit or debit)
// ============================
export const createTransaction = async (req, res) => {
    try {
        const { orderId, type } = req.body;
        const userId = req.user.userId;

        if (!orderId || !type) {
            return res.status(400).json({ message: "orderId and type are required" });
        }

        // Find the order
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        // ================= CREDIT TRANSACTION =================
        if (type === "credit") {
            if (!order.isPaid) {
                return res.status(400).json({ message: "Payment not verified" });
            }

            // Calculate amount from order items
            const amount = order.items.reduce(
                (total, item) => total + item.price * (item.quantity || 1),
                0
            );

            const transaction = await Transaction.create({
                userId,
                orderId,
                amount,
                type: "credit",
                paymentMethod: order.paymentMethod,
                paymentId: order.razorpay_payment_id,
                status: "success",
                description: `Payment for Order #${order._id}`,
            });

            return res.status(201).json({
                message: "Credit transaction recorded successfully",
                transaction,
            });
        }

        // ================= DEBIT TRANSACTION =================
        if (type === "debit") {
            if (!order.isPaid) {
                return res.status(400).json({ message: "Cannot refund unpaid order" });
            }

            // Calculate full refund amount from order items
            const amount = order.items.reduce(
                (total, item) => total + item.price * (item.quantity || 1),
                0
            );

            let status = "failed";
            let refundId = null;

            try {
                // Call Razorpay refund API
                const refund = await razorpay.payments.refund(order.razorpay_payment_id, {
                    amount: amount * 100, // amount in paise
                });
                status = "success";
                refundId = refund.id;
            } catch (error) {
                console.error("Refund failed:", error);
                status = "failed";
                refundId = `failed_${Date.now()}`;
            }

            const transaction = await Transaction.create({
                userId,
                orderId,
                amount,
                type: "debit",
                paymentMethod: "refund",
                paymentId: refundId,
                status,
                description: `Refund for Order #${order._id}`,
            });

            return res.status(201).json({
                message: status === "success" ? "Debit transaction successful" : "Debit transaction failed",
                transaction,
            });
        }

        // ================= INVALID TYPE =================
        return res.status(400).json({ message: "Invalid transaction type" });

    } catch (err) {
        console.error("Create Transaction Error:", err);
        res.status(500).json({ message: "Failed to record transaction" });
    }
};

// ============================
// Get all transactions
// ============================
export const getTransactions = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { type, status } = req.query; // optional filters

        let filter = { userId };
        if (type) filter.type = type;       // credit or debit
        if (status) filter.status = status; // pending, success, failed

        const transactions = await Transaction.find(filter).sort({ createdAt: -1 });

        res.json({ transactions });
    } catch (err) {
        console.error("Get Transactions Error:", err);
        res.status(500).json({ message: "Failed to fetch transactions" });
    }
};
