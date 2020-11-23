const express=require('express');
const router = express.Router();
//middlewares

const {authCheck,adminCheck} =require('../middlewares/auth');
const {upload,remove} =require('../controllers/cloudinary');

router.post('/uploadImages',authCheck,adminCheck,upload);
router.post('/removeImages',authCheck,adminCheck,remove);

module.exports = router;

