const transactionModel = require('../models/transactionModel');

async function addTransaction(req, res) {
    try {
        const { category , amount ,type , note } = req.body;
        console.log(category , amount ,type, note);
        if ( !amount || !category || !type) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
         if(type !== 'expense' && type !== 'income'){
            return res.status(400).json({message: 'Invalid type'});

        }
        const newTransaction = new transactionModel({
            amount,
            user: req.user.id ,
            category,
            type,
            note
        });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

async function getTransactions(req, res) {
    try {
        const transactions = await transactionModel.find({ user: req.user.id });
        res.status(200).json(transactions);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { addTransaction, getTransactions };