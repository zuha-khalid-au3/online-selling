const express=require('express');
//middlewares

const {authCheck} =require('../middlewares/auth');
const router = express.Router();
const {createOrUpdateUser}=require('../controllers/auth');
const {currentUser}=require('../controllers/auth');
router.post('/create-or-update-user',authCheck,createOrUpdateUser)
router.post('/current-user',authCheck,currentUser)




module.exports = router;