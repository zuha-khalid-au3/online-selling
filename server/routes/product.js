const express=require('express');
//middlewares

const {authCheck,adminCheck} =require('../middlewares/auth');
const router = express.Router();
const {create,listAll,remove,read,list,update,productsCount}=require('../controllers/product');
//router.get('/categories',list);
router.get('/products/total',productsCount);
router.post('/product',authCheck,adminCheck,create);

router.get('/products/:count',listAll);
router.delete('/products/:slug',authCheck,adminCheck,remove);
router.get('/product/:slug',read);
router.put('/product/:slug',authCheck,adminCheck,update);
router.post('/products',list);



module.exports = router;