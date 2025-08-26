import mongoose from "mongoose";

const NaturePaymentSchema = new mongoose.Schema({
    sectionCode: {
        type: String,
        required: true,
        unique: true,
    },
    descriptions: {   // <-- plural array
        type: [String],
        required: true,
    },
});

const NaturePayment = mongoose.model("NaturePayment", NaturePaymentSchema);

export default NaturePayment;
