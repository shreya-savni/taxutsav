// data/naturePaymentsdata.js 
import mongoose from "mongoose";
import NaturePayment from "../models/NaturePayment.js";

// ? Correct variable name
const seedData = [
    {
        sectionCode: "194J",
        descriptions: [
            "Fees for professional services",
            "Fees for technical services",
            "Royalty",
            "Non-compete fees"
        ]
    },
    {
        sectionCode: "194K",
        descriptions: ["Payment of any income for units of a mutual fund, e.g., dividend"]
    },
    {
        sectionCode: "194LA",
        descriptions: ["Compensation on acquiring certain immovable property"]
    },
    {
        sectionCode: "194M",
        descriptions: ["Payments by Individual/HUF not liable under 194C, 194H, 194J"]
    },
    {
        sectionCode: "194O",
        descriptions: ["E-commerce operator payments for sale of goods/services"]
    },
    {
        sectionCode: "194Q",
        descriptions: ["Payments for the purchase of goods"]
    }
];

const dataNaturePayments = async () => {
    try {
        await mongoose.connect("mongodb+srv://taxutsav_developer:developer123@cluster0.dvnztqj.mongodb.net/taxutsav?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await NaturePayment.deleteMany({});
        await NaturePayment.insertMany(seedData); // ? same name used

        console.log("? NaturePayments seeded successfully!");
        mongoose.connection.close();
    } catch (err) {
        console.error("? Error seeding NaturePayments:", err);
        mongoose.connection.close();
    }
};

dataNaturePayments(); 
