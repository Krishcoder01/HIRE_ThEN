const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares/autMiddleware');
const { addTransaction , getTransactions } = require('../controllers/transactionController');


router.post('/add' ,isLoggedIn , addTransaction);
router.get('/get',isLoggedIn, getTransactions);

module.exports = router;