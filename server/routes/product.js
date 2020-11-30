const express=require('express');
//middlewares

const {authCheck,adminCheck} =require('../middlewares/auth');
const router = express.Router();
const {create,listRelated,
    listAll,remove,read,list,update,productsCount,productStar}=require('../controllers/product');
//router.get('/categories',list);

router.post('/product',authCheck,adminCheck,create);
router.get('/products/total',productsCount);


router.get('/products/:count',listAll);
router.delete('/products/:slug',authCheck,adminCheck,remove);
router.get('/product/:slug',read);
router.put('/product/:slug',authCheck,adminCheck,update);
router.post('/products',list);
router.put('/product/star/:productId',authCheck,productStar);
router.get('/product/related/:productId',listRelated)


module.exports = router;