// const express=require('express');
// const router = express.Router();
// const PaytmChecksum = require('../Paytm/checksum')
// const PaytmConfig = require('../Paytm/config')
// // const {createPaymentIntent} = require('../controllers/paytm');

// // const {authCheck} =require('../middlewares/auth');

// // //router.post('/create-payment-intent',authCheck,createPaymentIntent);


// router.get('/payment',(req,res)=>{
//   console.log("aa gaya")
//   //console.log(req);
//       var paytmParams ={
//             "MID":process.env.MERCHANT_ID,
//             "WEBSITE": process.env.WEBSITE,
//             "INDUSTRY_TYPE_ID":process.env.INDUSTRY_TYPE,
//             "CHANNEL_ID":process.env.CHANNEL_ID,
//             // "ORDER_ID":req.query.orderId,
//             // "TXN_AMOUNT":req.query.amount,
//             "CALLBACK_URL":"https://securegw-stage.paytm.in/order/process",
//   }
//   res.json(paytmParams)
// });

// // // router.get('/payment',(req,res)=>{
// // //     var paytmParams ={
// // //         "MID":process.env.MERCHANT_ID,
// // //         "WEBSITE": process.env.WEBSITE,
// // //         "INDUSTRY_TYPE_ID":process.env.INDUSTRY_TYPE,
// // //         "CHANNEL_ID":process.env.CHANNEL_ID,
// // //         "ORDER_ID":req.query.orderId,
// // //         "TXN_AMOUNT":req.query.amount,
// // //         "CALLBACK_URL":"http://localhost/api/v1/public/callback",

// // //     };

// // //     checksum_lib.genchecksum(paytmParams,process.env.MERCHANT_KEY,function(err,checksum)
// // //     {
// // //      console.log(checksum);
// // //      var params = {
// // //          ...paytmParams,
// // //          CHECKSUMHASH: checksum
// // //      } 
// // //      res.json()  
// // //     })
// // // })

// // router.post('/payment', (req, res) => {
// // var params = {};
// // params['MID'] = config.PaytmConfig.mid;
// // params['WEBSITE'] = config.PaytmConfig.website;
// // params['CHANNEL_ID'] = 'WEB';
// // params['INDUSTRY_TYPE_ID'] = 'Retail';
// // params['ORDER_ID'] = 'TEST_' + new Date().getTime();
// // params['CUST_ID'] = 'customer_001';
// // params['TXN_AMOUNT'] = req.body.amount.toString();
// // params['CALLBACK_URL'] = 'http://localhost:8000/callback';
// // params['EMAIL'] = req.body.email;
// // params['MOBILE_NO'] = req.body.phone.toString();


// // checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
// //   var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
// //   // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

// //   var form_fields = "";
// //   for (var x in params) {
// //     form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
// //   }
// //   form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

// //   res.writeHead(200, { 'Content-Type': 'text/html' });
// //   res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
// //   res.end();
// // });
// // });


// // router.post('/callback', (req, res) => {
// // var body = '';

// // req.on('data', function (data) {
// // body += data;
// // });

// // req.on('end', function () {
// // var html = "";
// // var post_data = qs.parse(body);

// // // received params in callback
// // console.log('Callback Response: ', post_data, "\n");


// // // verify the checksum
// // var checksumhash = post_data.CHECKSUMHASH;
// // // delete post_data.CHECKSUMHASH;
// // var result = checksum_lib.verifychecksum(post_data, config.PaytmConfig.key, checksumhash);
// // console.log("Checksum Result => ", result, "\n");


// // // Send Server-to-Server request to verify Order Status
// // var params = { "MID": config.PaytmConfig.mid, "ORDERID": post_data.ORDERID };

// // checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {

// //   params.CHECKSUMHASH = checksum;
// //   post_data = 'JsonData=' + JSON.stringify(params);

// //   var options = {
// //     hostname: 'securegw-stage.paytm.in', // for staging
// //     // hostname: 'securegw.paytm.in', // for production
// //     port: 443,
// //     path: '/merchant-status/getTxnStatus',
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/x-www-form-urlencoded',
// //       'Content-Length': post_data.length
// //     }
// //   };


// //   // Set up the request
// //   var response = "";
// //   var post_req = https.request(options, function (post_res) {
// //     post_res.on('data', function (chunk) {
// //       response += chunk;
// //     });

// //     post_res.on('end', function () {
// //       console.log('S2S Response: ', response, "\n");

// //       var _result = JSON.parse(response);
// //       res.render('response', {
// //         'data': _result
// //       })
// //     });
// //   });

// //   // post the data
// //   post_req.write(post_data);
// //   post_req.end();
// // });
// // });
// // })





//  module.exports = router




/*New*/


// require('dotenv').config()
const formidable=require('formidable')
const express=require('express')
const router=express.Router()
const {v4:uuidv4}=require('uuid')
const https=require('https')
const PaytmChecksum=require('../paytm/PaytmChecksum')



router.post('/callback',(req,res)=>
{

const form=new formidable.IncomingForm();

form.parse(req,(err,fields,file)=>
{
paytmChecksum = fields.CHECKSUMHASH;
delete fields.CHECKSUMHASH;

var isVerifySignature = PaytmChecksum.verifySignature(fields, process.env.MERCHANT_KEY, paytmChecksum);
if (isVerifySignature) {
    var paytmParams = {};
    paytmParams["MID"]     = fields.MID;
    paytmParams["ORDERID"] = fields.ORDERID;
    
    /*
    * Generate checksum by parameters we have
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    PaytmChecksum.generateSignature(paytmParams, process.env.MERCHANT_KEY).then(function(checksum){
    
        paytmParams["CHECKSUMHASH"] = checksum;
    
        var post_data = JSON.stringify(paytmParams);
    
        var options = {
    
            /* for Staging */
            hostname: 'securegw-stage.paytm.in',
    
            /* for Production */
            // hostname: 'securegw.paytm.in',
    
            port: 443,
            path: '/order/status',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length
            }
        };
    
        var response = "";
        var post_req = https.request(options, function(post_res) {
            post_res.on('data', function (chunk) {
                response += chunk;
            });
    
            post_res.on('end', function(){
                res.json(response)
            });
        });
    
        post_req.write(post_data);
        post_req.end();
    });        
            
} else {
	console.log("Checksum Mismatched");
}

})

});



router.post('/payment',(req,res)=>
{
const{amount,email}=req.body;
console.log("aa gayaaa")
    /* import checksum generation utility */
const totalAmount=JSON.stringify(amount);
var params = {};

/* initialize an array */
params['MID'] = process.env.MERCHANT_ID,
params['WEBSITE'] = process.env.WEBSITE,
params['CHANNEL_ID'] = process.env.CHANNEL_ID,
params['INDUSTRY_TYPE_ID'] = process.env.INDUSTRY_TYPE,
params['ORDER_ID'] = uuidv4(),
params['CUST_ID'] = process.env.CUST_ID,
params['TXN_AMOUNT'] = totalAmount,
params['CALLBACK_URL'] = 'http://localhost:8000/api/callback',
params['EMAIL'] =email,
params['MOBILE_NO'] = '9876543210'

/**
* Generate checksum by parameters we have
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
var paytmChecksum = PaytmChecksum.generateSignature(params, process.env.MERCHANT_KEY);
paytmChecksum.then(function(checksum){
    let paytmParams={
        ...params,
        "CHECKSUMHASH":checksum
    }
    res.json(paytmParams)
}).catch(function(error){
	console.log(error);
});

})

module.exports=router