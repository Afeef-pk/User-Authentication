const jwt = require("jsonwebtoken")

module.exports.userAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            res.status(401).json({ message: "No permission" })
        } else {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log(err);
                    res.status(401).json({ status: false, message: "Session expired please login" })
                } else if (decoded.role === 'user') {
                    req.userId = decoded._id
                    next()
                } else {
                    res.status(401).json({ status: false, message: "No permission" })
                }
            })
        }
    } catch (error) {
        next(error);
    }
}
