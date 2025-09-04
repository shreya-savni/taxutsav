import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// HRA Calculation API
app.post("/calculate-hra", (req, res) => {
    const {
        basicSalary,
        da, // DA forming part of salary
        hraReceived,
        rentPaid,
        isMetro,
    } = req.body;

    // Salary for HRA purpose = Basic + DA (forming part of retirement benefits)
    const salary = basicSalary + da;

    // Rule 1: Actual HRA received
    const rule1 = hraReceived;

    // Rule 2: 50% (metro) or 40% (non-metro) of salary
    const rule2 = (isMetro ? 0.5 : 0.4) * salary;

    // Rule 3: Rent paid - 10% of salary
    const rule3 = rentPaid - 0.1 * salary;

    // Exempted HRA = least of rule1, rule2, rule3 (cannot be negative)
    const exemptedHRA = Math.max(0, Math.min(rule1, rule2, rule3));

    // Taxable HRA
    const taxableHRA = hraReceived - exemptedHRA;

    res.json({
        salary,
        hraReceived,
        exemptedHRA,
        taxableHRA,
        rules: {
            rule1_actualHRA: rule1,
            rule2_salaryPercent: rule2,
            rule3_rentMinus10Percent: rule3,
        },
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`HRA Calculator API running on http://localhost:${PORT}`);
});
