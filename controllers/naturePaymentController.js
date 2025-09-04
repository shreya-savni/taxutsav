import NaturePayment from "../models/NaturePayment.js";

// Get ALL sections
export const getNaturePayments = async (req, res) => {
    try {
        const payments = await NaturePayment.find();
        res.status(200).json({ success: true, data: payments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get by sectionCode
export const getNaturePaymentById = async (req, res) => {
    try {
        const { sectionCode } = req.params;
        const payment = await NaturePayment.findOne({ sectionCode });

        if (!payment) {
            return res.status(404).json({ success: false, message: "Section not found" });
        }

        res.status(200).json({ success: true, data: payment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



