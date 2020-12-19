// import React from 'react';
// import axios from 'axios';
// import {useSelector,useDispatch} from 'react-redux';
// import {Link} from 'react-router-dom';
// //import {userCart} from '../functions/user'
// const Payment=({history})=> {
//   //  const {cart,user}=useSelector((state) => ({ ...state }));
//     const dispatch=useDispatch();

// // const onPayment= async(e)=>{
// //     e.preventDefault();

// //     try{
// //         var amount="100";
// //         var phone_number="+9144164";
// //         var orderId="ORDER_ID"+(new Date().getTime());
// //         let params={
// //             orderId:orderId,
// //             amount:amount,
// //             phone_number:phone_number
// //         };
// //         var url="http://localhost:5000/api/v1/public/payment";
// //         var request={
// //             url:url,
// //             params:params,
// //             method:"get"
// //         }
// // const response= await axios(request);
// // const processParams=await response.json;
// // console.log(processParams);
// // var details={
// //     action:"https://securegw-stage.paytm.in/order/process",
// //     params:processParams
// // }

// //     }catch (err) {

// //     }
// // }
// const handlePost = () => {
//     history.push('/payment');
//   }
//     return (
//         <div className="App">
//         <p> Complete payment</p>
//        {/* <button className="btn btn-sm btn-primary mt-2" onClick={handlePost}>
                     
//                     Place Order  
//                       </button> */}
//        <form
//                     onSubmit={handlePost}>
//                     <h2>Place Order</h2>
//                     <label>
//                         <span class="text">user:</span>
//                         <input type="email" name="email"/><br/>
//                     </label>
//                     <br/>
//                     <label>
//                         <span class="text">password:</span>
//                         <input type="password" name="password"/><br/>
//                     </label>
//                     <br/>
//                     <div class="align-right">
//                         <button>Submit</button>
//                     </div>
//                 </form>
//             </div>
//     )
// }

// export default Payment





import React from 'react'

const Payment = () => {



    function isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
      }
      
      function isObj(val) {
        return typeof val === 'object'
      }
      
       function stringifyValue(val) {
        if (isObj(val) && !isDate(val)) {
          return JSON.stringify(val)
        } else {
          return val
        }
      }
      
      function buildForm({ action, params }) {    
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)
      
        Object.keys(params).forEach(key => {
          const input = document.createElement('input')
          input.setAttribute('type', 'hidden')
          input.setAttribute('name', key)
          input.setAttribute('value', stringifyValue(params[key]))
          form.appendChild(input)
        })
      
        return form
      }
      
       function post(details) {
        const form = buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
      }
    
  const getData=(data)=>
  {

    return fetch(`http://localhost:8000/api/payment`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(response=>response.json()).catch(err=>console.log(err))
  }



    const makePayment=()=>
    {
getData({amount:500,email:'abc@gmail.com'}).then(response=>{
 
    var information={
        action:"https://securegw-stage.paytm.in/order/process",
        params:response
    }
  post(information)

})
    }
    return (
        <div>
            <button onClick={makePayment}>PAY USING PAYTM</button>
        </div>
    )
}

export default Payment
