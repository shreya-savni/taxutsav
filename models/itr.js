import mongoose from "mongoose";

const itrSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        financialYear: { type: String, required: true },
        incomeDetails: {
            salary: { type: Number, default: 0 },
            business: { type: Number, default: 0 },
            otherIncome: { type: Number, default: 0 }
        },
        deductions: {
            section80C: { type: Number, default: 0 },
            section80D: { type: Number, default: 0 },
            otherDeductions: { type: Number, default: 0 }
        },
        taxPaid: { type: Number, default: 0 },
        taxDue: { type: Number, default: 0 },
        status: { type: String, enum: ["Pending", "Filed", "Processed"], default: "Pending" },
        documents: [{ type: String }]
    },
    { timestamps: true }
);

export default mongoose.model("ITR", itrSchema);
