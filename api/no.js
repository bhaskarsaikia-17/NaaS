const messages = require('../messages.json');

const GOLDEN_REJECTION = "NO. (You have unlocked the Golden Rejection. This implies nothing changes, but you are statistically special.)";

module.exports = (req, res) => {
    // 0.1% chance for Golden Rejection (1 in 1000)
    const roll = Math.floor(Math.random() * 1000) + 1;

    let message;
    let isGolden = false;

    if (roll === 1000) {
        message = GOLDEN_REJECTION;
        isGolden = true;
    } else {
        const randomIndex = Math.floor(Math.random() * messages.length);
        message = messages[randomIndex];
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.status(200).json({
        message,
        ...(isGolden && { golden: true, odds: "1/1000" })
    });
};
