const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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
        username === " " ||
        email === " " ||
        password === " "
    ) {
        // return next(errorHandler(400, "All fields are reuired"));
        return res.status(400).json("All fields are required")
    }
    if (existingUsername) {
        //return next(errorHandler(400, "Username already exists"));
        return res.status(400).json("Username already exists")
    }
    if (existingEmail) {
        //return next(errorHandler(400, "Email already exists"));
        return res.status(400).json("Email already exists")
    }
    if (password.length !== 8) {
        //return (next(errorHandler(400, "Password must contain 8 characters")))
        return res.status(400).json("Password must contain 8 characters")
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
        return res.status(200).json({"Signup Successful": user});
    }
    catch (error) {
        return res.status(500).json(error.message)
    }
};


const signIn = async (req, res, next) => {
    // A user can log in with their username or their email
    try {
        const { username, email, password } = req.body;
        const identifier = email || username;

        if (
            !identifier ||
            !password ||
            identifier === " " ||
            password === " "
        ) {
            //return next(errorHandler(400, "All fields are required"))
            return res.status(400).json("All fields are required")
        }

        let validUser = await User.findOne({
            /*The $or operator takes an array of conditions and returns documents that satisfy any one of 
            those conditions. Usage: When you want to allow searching across different fields (e.g., username
             OR email), alternate Conditions - When any of several conditions can return a result (e.g., posts 
             with a certain tag OR a certain author).
            */
            $or: [{ email: identifier }, { username: identifier }]
        });
        if (!validUser) {
            // return next(errorHandler(400, "User does not exist"));
            return res.status(400).json("User does not exist")
        }

        let validPassword = await bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            // return next(errorHandler(400, "Invalid credential"));
            return res.status(400).json("Invalid credential")
        }

        /* JWT authentication. Use require('crypto').randomBytes(64).toString('hex') to generate secret key 
        on the terminal*/
        let token = jwt.sign({ id: validUser._id }, process.env.ACCESS_TOKEN);
        let { password: pass, ...rest } = validUser._doc

        res
            .status(200)
            .cookie('access_token', token, {
                httpOnly: true
            })
            .json({"Sign in Successful": {rest}});

    }
    catch (error) {
        next(error);
    }

};


module.exports = {
    signUp,
    signIn
};