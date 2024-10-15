const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');
const { errorHandler } = require('../utilities/error');

require('dotenv').config();

const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;

    let existingUsername = await User.findOne({ username: req.body.username });
    let existingEmail = await User.findOne({ email: req.body.email });
    let hashedPassword = await bcryptjs.hashSync(password, 10);

    if (
        !username ||
        !email ||
        !password ||
        username == " " ||
        email == " " ||
        password == " "
    ) {
        return next(errorHandler(400, "All fields are reuired"));
    }
    if (existingUsername) {
        return next(errorHandler(400, "Username already exists"));
    }
    if (existingEmail) {
        return next(errorHandler(400, "Email already exists"));
    }
    if (password.length != 8) {
        return (next(errorHandler(400, "Password must contain 8 characters")))
    }

    try {
        const newUser = new User(
            {
                username,
                email,
                password: hashedPassword
            }
        )
        const user = await newUser.save();
        return res.status(200).json("Signup Successful")
    }
    catch (error) {
        return res.status(500).json(error.message)
    }
};

module.exports = { signUp };