const jwt = require("jsonwebtoken");

async function isLoggedIn(req, res, next) {
    let token = req.header("Authorization");

    // Check if the Authorization header exists
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Ensure token starts with 'Bearer '
    if (!token.startsWith("Bearer ")) {
        return res.status(400).json({ error: "Invalid token format" });
    }

    // Extract the token part after 'Bearer '
    token = token.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid or expired token" });
    }
}

module.exports = { isLoggedIn };
