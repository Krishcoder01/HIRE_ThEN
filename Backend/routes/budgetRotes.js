const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares/autMiddleware');
const {addBudget , getBudgets} =require('../controllers/bugetController');

router.post('/add' , isLoggedIn , addBudget) ;
router.get('/get' , isLoggedIn ,getBudgets);

module.exports = router