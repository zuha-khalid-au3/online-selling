const admin=require('../firebase');
const User= require('../models/user');
exports.authCheck=async (req,res,nxt)=>{
    try{
        const firebaseUser=await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);
        console.log(firebaseUser);
        req.user=firebaseUser;
        nxt();
    }catch(err){
        res.status(401).json({
            err:"Invalid or Expired token",
        });
    }
    
};

exports.adminCheck= async (req,res,nxt)=>{
    const {email}=req.user;
    const adminUser= await User.findOne({email}).exec();

    if(adminUser.role !=='admin'){
        res.status(403).json({
            err:'Admin resource. Access denied',
        });
    }else{
        nxt();
    }
};