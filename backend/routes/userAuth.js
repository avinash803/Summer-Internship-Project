const jwt = require('jsonwebtoken');

const Authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token 

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (token === 'null') {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({ message: "Forbidden or Token is Expired" });
        }
        req.user = user;
        next();
    });

};

module.exports = {Authentication};