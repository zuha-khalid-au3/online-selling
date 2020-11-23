const express=require('express');
//middlewares

const {authCheck,adminCheck} =require('../middlewares/auth');
const router = express.Router();
const {create}=require('../controllers/product');
//router.get('/categories',list);
router.post('/product',authCheck,adminCheck,create);






module.exports = router;