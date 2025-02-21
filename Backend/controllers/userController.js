const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        const user = await User
            .findOne({ email: email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });

}catch(error){
    console.log(error);
    res.status(500).json({message: 'Server Error'});
}}

async function loginUser(req, res) {
    const {email, password} = req.body;

    try {
        
        if(!email || !password){
            return res.status(400).json({message: 'Please enter all fields'});
        }
        const user = await User
            .findOne({ email: email });
        if(!user){
            return res.status(400).json({message: 'User does not exist'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({message: 'Server Error'});

    }
}

module.exports = {
    registerUser ,
    loginUser
}
