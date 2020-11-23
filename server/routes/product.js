const express=require('express');
//middlewares

const {authCheck,adminCheck} =require('../middlewares/auth');
const router = express.Router();
const {create,read}=require('../controllers/product');
//router.get('/categories',list);
router.post('/product',authCheck,adminCheck,create);
router.post('/products',read);






module.exports = router;