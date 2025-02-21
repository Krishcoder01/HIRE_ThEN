const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum :['expense', 'income']
    },
    note: {
        type: String
    } ,
    category: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Transactions', transactionSchema);