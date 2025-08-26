import mongoose from "mongoose";
import Tds from "../models/tds.js";

const seedTdsData = async () => {
    try {
        console.log("?? Connecting to MongoDB...");
        await mongoose.connect(
            "mongodb+srv://taxutsav_developer:developer123@cluster0.dvnztqj.mongodb.net/taxutsav?retryWrites=true&w=majority");


        console.log("?? Connection successful. Seeding data...");

        const seedData = [

            {
                sectionCode: "194H",
                thresholdAmount: 15000,
                thresholdPeriod: "FY",
                calculationMethod: "partial_over_threshold",
                defaultPanRate: 5,
                defaultNoPanRate: 20,
                rateRules: [{ label: "Default", panRate: 5, noPanRate: 20 }],
                effectiveFy: "2025-26",
                rate: 5,
                panAvailable: true,
                payerType: "others",
                descriptions: ["Commission or brokerage payments"]
            },
            {
                sectionCode: "194I",
                thresholdAmount: 240000,
                thresholdPeriod: "FY",
                calculationMethod: "partial_over_threshold",
                defaultPanRate: 10,
                defaultNoPanRate: 20,
                rateRules: [
                    { label: "Plant/Machinery", panRate: 2, noPanRate: 20 },
                    { label: "Land/Building", panRate: 10, noPanRate: 20 }
                ],
                effectiveFy: "2025-26",
                rate: 10,
                panAvailable: true,
                payerType: "others",
                descriptions: ["Rent payments"]
            },
            {
                sectionCode: "194J",
                thresholdAmount: 30000,
                thresholdPeriod: "FY",
                calculationMethod: "full_on_crossing",
                defaultPanRate: 10,
                defaultNoPanRate: 20,
                rateRules: [
                    { label: "Default", panRate: 10, noPanRate: 20 },
                    { label: "Technical Services", panRate: 2, noPanRate: 20 }
                ],
                effectiveFy: "2025-26",
                rate: 10,
                panAvailable: true,
                payerType: "others",
                descriptions: [
                    "Fees for professional services",
                    "Fees for technical services",
                    "Royalty",
                    "Non-compete fees"
                ]
            },
            {
                sectionCode: "194K",
                thresholdAmount: 5000,
                thresholdPeriod: "FY",
                calculationMethod: "partial_over_threshold",
                defaultPanRate: 10,
                defaultNoPanRate: 20,
                rateRules: [{ label: "Default", panRate: 10, noPanRate: 20 }],
                effectiveFy: "2025-26",
                rate: 10,
                panAvailable: true,
                payerType: "others",
                descriptions: ["Payment of any income for units of a mutual fund, e.g., dividend"]
            },
            {
                sectionCode: "194LA",
                thresholdAmount: 250000,
                thresholdPeriod: "FY",
                calculationMethod: "full_on_crossing",
                defaultPanRate: 10,
                defaultNoPanRate: 20,
                rateRules: [{ label: "Default", panRate: 10, noPanRate: 20 }],
                effectiveFy: "2025-26",
                rate: 10,
                panAvailable: true,
                payerType: "others",
                descriptions: ["Compensation on acquiring certain immovable property"]
            },
            {
                sectionCode: "194M",
                thresholdAmount: 500000,
                thresholdPeriod: "FY",
                calculationMethod: "partial_over_threshold",
                defaultPanRate: 5,
                defaultNoPanRate: 20,
                rateRules: [{ label: "Default", panRate: 5, noPanRate: 20 }],
                effectiveFy: "2025-26",
                rate: 5,
                panAvailable: true,
                payerType: "others",
                descriptions: ["Payments by Individual/HUF not liable under 194C, 194H, 194J"]
            },
            {
                sectionCode: "194O",
                thresholdAmount: 500000,
                thresholdPeriod: "FY",
                calculationMethod: "full_on_crossing",
                defaultPanRate: 1,
                defaultNoPanRate: 20,
                rateRules: [{ label: "Default", panRate: 1, noPanRate: 20 }],
                effectiveFy: "2025-26",
                rate: 1,
                panAvailable: true,
                payerType: "others",
                descriptions: ["E-commerce operator payments for sale of goods/services"]
            },
            {
                sectionCode: "194Q",
                thresholdAmount: 5000000,
                thresholdPeriod: "FY",
                calculationMethod: "partial_over_threshold",
                defaultPanRate: 0.1,
                defaultNoPanRate: 5,
                rateRules: [{ label: "Default", panRate: 0.1, noPanRate: 5 }],
                effectiveFy: "2025-26",
                rate: 0.1,
                panAvailable: true,
                payerType: "others",
                descriptions: ["Payments for the purchase of goods"]
            }
        ];

        // Delete old data
        await Tds.deleteMany({});
        console.log("?? Old TDS data cleared.");

        // Insert new seed data
        await Tds.insertMany(seedData);
        console.log("? All TDS sections seeded successfully!");

        // Close connection
        await mongoose.connection.close();
        console.log("?? MongoDB connection closed.");
    } catch (err) {
        console.error("? Error seeding TDS data:", err);
        await mongoose.connection.close();
    }
};

seedTdsData();
