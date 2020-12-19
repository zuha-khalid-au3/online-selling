import React,{useState, useEffect}from 'react'
import {useSelector,useDispatch} from 'react-redux';
import axios from 'axios';
import {getUserCart,emptyUserCart,saveUserAddress,
applyCoupon} from '../functions/user';
import {toast} from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function Checkout({history}) {
   
    const [products,setProducts]=useState([]);
    const [total,setTotal]=useState(0);
    const [address,setAddress]=useState('');
    const [coupon,setCoupon]=useState('');
    const [addressSaved,setAddressSaved]=useState(false);
    const [totalAfterDiscount,setTotalAfterDiscount]=useState(0);
    const [discountError,setDiscountError]=useState('');
    const dispatch=useDispatch();
    const {user}=useSelector((state) => ({ ...state }))
    //const [k,setK]=useState(0);
    
    useEffect(() => {
        getUserCart(user.token)
        .then((res)=>{
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
       // console.log(typeof(res))
        })
    },[])
    const emptyCart=()=>{
        if(typeof window !== 'undefined'){
            localStorage.removeItem('cart');
        }
            dispatch({
                type:'ADD_TO_CART',
                payload:[],
            })
        emptyUserCart(user.token)
        .then((res) => {
            setProducts([]);
            setTotal(0);
            setTotalAfterDiscount(0)
            setCoupon('')
            toast.success("Cart is empty. Continue Shopping");
        });
    }


    const saveAddressToDb=() =>
    {
        saveUserAddress(user.token,address)
        .then((res)=>{
            setAddressSaved(true)
            toast.success('Address saved');
            //console.log(typeof(parseFloat(JSON.stringify({total}))));
        }
            )
    };
    const showAddress=()=>(
    <> 
     <ReactQuill theme="snow" value={address} onChange={setAddress}
                />
                <button className="btn btn-primary mt-2"
                onClick={saveAddressToDb}>Save</button>
    </>
    )
    

    const showProductSummary =()=>

        products.map((p,i)=>(
            <div key={i}>
                <p>{p.product.title} ({p.color}) x {p.count} = {"₹"}
                {p.product.price * p.count}
                </p>
                </div>
              ))
    const applyDiscountCoupon=()=>{

        applyCoupon(user.token,coupon)
        .then(res=>{
            console.log(res.data)

            if(res.data){
                setTotalAfterDiscount(res.data);
                dispatch({
                    type:"COUPON_APPLIED",
                    payload:true,
                })

                if(res.data.err){
                    setDiscountError(res.data.err);
                    dispatch({
                        type:"COUPON_APPLIED",
                        payload:false,
                    })
                }
            }
        })
        console.log(coupon);
    }
            const showApplyCoupon=() =>(
                <>
              <input
                onChange={(e)=>{setCoupon(e.target.value);
                    setDiscountError("");
                }}  
                value={coupon}
                type="text"
                className="form-control"
                />
                <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">Apply</button>
                </>
            )

               //Paytm-Checkout

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
             getUserCart(user.token)
                 .then((res)=>
                 {
                     var k= res.data.cartTotal;
                    // console.log(k);
                     getData({amount:k,email:'abc@gmail.com'})
                     .then(response=>{
                      
                         var information={
                             action:"https://securegw-stage.paytm.in/order/process",
                             params:response
                         }
                       post(information)
                 }
                     )
                }
                
                   
               //var z= parseInt(JSON.stringify({total}));
               
                // var z=JSON.stringify(parseInt({total}));
        // getData({amount:z.data.cartTotal,email:'abc@gmail.com'})
        // .then(response=>{
         
        //     var information={
        //         action:"https://securegw-stage.paytm.in/order/process",
        //         params:response
        //     }
        //   post(information)
        
        // })
    
                   ) 
                 }
                

                
    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br/>
                <br/>
               {showAddress()}
               <hr/> 
               <h4>Got Coupon?</h4>
               <br/>
               {showApplyCoupon()}
               <br/>
               {discountError && <p className="bg-danger p-2">{discountError}</p>}
            </div>
          <div className="col-md-6">
              <h4>Order Summary</h4>
              <hr/>
    <p>Products {products.length}</p>
              <hr/>
             {showProductSummary()}
              <hr/>
              <p>Cart Total= ₹{total}</p>
                {totalAfterDiscount>0 && (
                    <p className="bg-success p-2">Discount Applied-Total Payable:{totalAfterDiscount}</p>
                )}

              <div className="row">
                  <div className="col-md-6">
                      <button className="btn btn-primary"
                      disabled={!addressSaved || !products.length}
                      onClick={makePayment}
                      >
                          Place Order
                      </button>
              </div>
              <div className="col-md-6">
                  <button disabled={!products.length}
                  onClick={emptyCart}
                  className="btn btn-primary">
                      Empty Cart
                  </button>
              </div>
              </div>
          </div>
        </div>
    )
}

export default Checkout
