const User = require('../models/user')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require('validator')

module.exports = {
    userSignup: async (req, res, next) => {
        try {
            const { name, email, mobile, password } = req.body;

            if (!validator.isMobilePhone(mobile + '', 'en-IN', { strictMode: false })) {
                return res.status(400).json({ message: 'Invalid mobile number' });
            }
            if (!validator.isEmail(email + '')) {
                return res.status(400).json({ message: 'Invalid email' });
            }
            if (!name) return res.status(400).json({ message: 'Name is required' });

            const userExists = await User.findOne({ $or: [{ mobile: mobile }, { email: email }] });
            if (userExists) return res.status(409).json({ message: 'User already exists' });

            const encryptedPassword = await bcrypt.hash(password, 10);
            await User.create({
                name,
                email,
                mobile,
                password: encryptedPassword
            })
            res.status(201).json({ message: 'Signup successfull' })
        } catch (error) {
            next(error)
        }
    },
    userLogin: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!validator.isEmail(email + '')) return res.status(400).json({ message: 'Invalid email' });
            if (!password) return res.status(400).json({ message: 'Password is required' });

            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) return res.status(400).json({ message: "Invalid Credentials" })

            jwt.sign(
                {
                    name: user.name,
                    _id: user._id,
                    role: "user"
                },
                process.env.JWT_SECRET,
                { expiresIn: '7d' },
                (err, token) => {
                    if (err) {
                        return res
                            .status(403)
                            .json({ message: 'error in token generation' })
                    }
                    if (token) {
                        res.status(200).json({ message: "Login Successfull", token })
                    }
                }
            )
        } catch (error) {
            next(error)
        }
    },
    getUserProfile: async (req, res, next) => {
        try {
            const user = await User.findOne({ _id: req.userId })
            res.status(200).json({ user })
        } catch (error) {
            next(error)
        }
    }
}