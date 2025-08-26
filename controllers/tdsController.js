import Tds from '../models/tds.js';

export const calculate = async (req, res) => {
    try {
        let { sectionCode, amount, panAvailable, fy, ytdPaid, ruleLabel } = req.body;

        // Convert values to proper types
        const paymentAmount = Number(amount || 0);
        const ytdAmount = Number(ytdPaid || 0);
        const hasPan = panAvailable === true || panAvailable === "true";

        // Find section from DB
        const section = await Tds.findOne({ sectionCode });
        if (!section)
            return res.status(404).json({ success: false, message: "Section not found" });

        // Determine applicable rate rule
        let rule;
        if (section.rateRules?.length) {
            rule = section.rateRules.find(
                r => r.label.toLowerCase().trim() === (ruleLabel || "").toLowerCase().trim()
            );
            if (!rule) rule = section.rateRules[0]; // fallback
        }

        // Determine PAN/No PAN rate
        const panRate = Number(rule?.panRate ?? section.defaultPanRate ?? 0);
        const noPanRate = Number(rule?.noPanRate ?? section.defaultNoPanRate ?? 20);
        const rateUsed = hasPan ? panRate : noPanRate;

        // Initialize calculation variables
        let taxableAmount = 0;
        let crossed = false;
        let thresholdRemaining = Number(section.thresholdAmount ?? 0);

        // Threshold calculation
        if (section.thresholdPeriod === 'FY') {
            const totalPaid = ytdAmount + paymentAmount;
            const threshold = Number(section.thresholdAmount ?? 0);

            crossed = totalPaid > threshold;

            if (crossed) {
                taxableAmount =
                    section.calculationMethod === 'full_on_crossing'
                        ? paymentAmount
                        : totalPaid - threshold - ytdAmount;
                thresholdRemaining = 0;
            } else {
                taxableAmount = 0;
                thresholdRemaining = threshold - totalPaid;
            }
        } else {
            // Single payment threshold
            const threshold = Number(section.thresholdAmount ?? 0);
            crossed = paymentAmount > threshold;

            taxableAmount =
                crossed && section.calculationMethod === 'full_on_crossing'
                    ? paymentAmount
                    : crossed
                        ? paymentAmount - threshold
                        : 0;

            thresholdRemaining = crossed ? 0 : threshold - paymentAmount;
        }

        // Calculate TDS
        const tdsAmount = (taxableAmount * rateUsed) / 100;

        // Send response
        return res.json({
            success: true,
            data: {
                sectionCode,
                fy,
                rateUsed,
                taxableAmount,
                tdsAmount,
                thresholdRemaining,
                crossed
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
