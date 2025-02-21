const budgetModel = require('../models/bugetModel');

async function addBudget(req, res) {
    try {
        const { category, limit} = req.body;
        if (!category || !limit) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        const newBudget = new budgetModel({
            category,
            limit,
            user: req.user.id
        });
        await newBudget.save();
        res.status(201).json(newBudget);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

async function getBudgets(req, res) {
    try {
        const userBudget = await budgetModel.find({user :req.user.id});
        res.status(200).json(userBudget);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}


module.exports = { addBudget, getBudgets };