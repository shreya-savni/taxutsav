import mongoose from "mongoose";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user.userId;
        const sender = await User.findById(senderId).select("role");

        if (!sender) {
            return res.status(404).json({ success: false, message: "Sender not found" });
        }

        let receiverId;

        if (sender.role === "admin") {

            if (!req.body.userId) {
                return res.status(400).json({ success: false, message: "userId is required for admin" });
            }

            const user = await User.findById(req.body.userId);
            if (!user || user.role !== "user") {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            receiverId = user._id;

        } else {

            const admin = await User.findOne({ role: "admin" });
            if (!admin) {
                return res.status(404).json({ success: false, message: "Admin not found" });
            }
            receiverId = admin._id;
        }


        if (!req.body.message || req.body.message.trim() === "") {
            return res.status(400).json({ success: false, message: "Message cannot be empty" });
        }

        const chat = new Chat({
            senderId,
            receiverId,
            message: req.body.message
        });

        await chat.save();

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: chat
        });

    } catch (error) {
        console.error("Error in sendMessage:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getChatList = async (req, res) => {
    try {
        const senderId = req.user.userId;
        const sender = await User.findById(senderId).select("role");

        if (!sender || sender.role !== "admin") {
            return res.status(403).json({ success: false, message: "Only admin can access chat list" });
        }

        const chats = await Chat.aggregate([
            {
                $match: {
                    $or: [
                        { senderId: new mongoose.Types.ObjectId(senderId) },
                        { receiverId: new mongoose.Types.ObjectId(senderId) }
                    ]
                }
            },
            { $sort: { createdAt: -1 } },
            {
                $group: {
                    _id: {
                        $cond: [
                            { $eq: ["$senderId", new mongoose.Types.ObjectId(senderId)] },
                            "$receiverId",
                            "$senderId"
                        ]
                    },
                    lastMessage: { $first: "$message" },
                    lastMessageAt: { $first: "$createdAt" },
                    unreadCount: {
                        $sum: { $cond: [{ $eq: ["$isRead", false] }, 1, 0] }
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    userId: "$user._id",
                    userName: "$user.name",
                    lastMessage: 1,
                    lastMessageAt: 1,
                    unreadCount: 1
                }
            },
            { $sort: { lastMessageAt: -1 } }
        ]);

        return res.json({ success: true, data: chats });
    } catch (error) {
        console.error("Error in getChatList:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
export const getConversation = async (req, res) => {
    try {
        const senderId = req.user.userId;
        let { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }

        // Fix: remove whitespace/newlines
        userId = userId.trim();

        const messages = await Chat.find({
            $or: [
                { senderId: senderId, receiverId: userId },
                { senderId: userId, receiverId: senderId }
            ]
        }).sort({ createdAt: 1 });

        return res.json({ success: true, data: messages });
    } catch (error) {
        console.error("Error in getConversation:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
