const express=require('express');

const router = express.Router();

router.get('/user',(req,res)=>{
    res.json({
        data:' User API Successfull'
    })
})


module.exports = router;