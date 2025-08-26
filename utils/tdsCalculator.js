async function calculateTDS({ section, amount, hasPAN, ytdAmount = 0 }) {
    const rate = hasPAN ? section.rateWithPAN : section.rateWithoutPAN || 20;
    let tdsAmount = 0;

    // Threshold check
    const totalAmount = ytdAmount + amount;
    if (totalAmount > (section.threshold || 0)) {
        tdsAmount = (amount * rate) / 100;
    }

    return { tdsAmount, rate };
}

