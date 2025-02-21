const mongoose = require('mongoose');

const bugetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    limit : {
        type: Number,
        required: true
    } ,
    category: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Bugets', bugetSchema);