import mongoose from "mongoose";

const tdsSchema = new mongoose.Schema({
    sectionCode: { type: String, required: true, unique: true },
    thresholdAmount: { type: Number, required: true },
    thresholdPeriod: { type: String, enum: ["FY", "Single"], required: true },
    calculationMethod: { type: String, enum: ["partial_over_threshold", "full_on_crossing"], required: true },

    defaultPanRate: { type: Number, required: true },
    defaultNoPanRate: { type: Number, required: true },

    rateRules: [
        {
            label: { type: String, required: true },
            panRate: { type: Number, required: true },
            noPanRate: { type: Number, required: true }
        }
    ],

    effectiveFy: { type: String, required: true }, // e.g. "2025-26"
    rate: { type: Number, required: true },
    panAvailable: { type: Boolean, required: true },
    payerType: { type: String, enum: ["individual", "others"], required: true },

    descriptions: { type: [String], required: true }
});

export default mongoose.model("Tds", tdsSchema);


