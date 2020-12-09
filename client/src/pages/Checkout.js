import React,{useState, useEffect}from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {getUserCart,emptyUserCart,saveUserAddress} from '../functions/user';
import {toast} from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function Checkout() {
   
    const [products,setProducts]=useState([]);
    const [total,setTotal]=useState(0);
    const [address,setAddress]=useState('');
    const [addressSaved,setAddressSaved]=useState(false);
    const dispatch=useDispatch();
    const {user}=useSelector((state) => ({ ...state }))
    useEffect(() => {
        getUserCart(user.token)
        .then((res)=>{
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
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
            toast.success("Cart is empty. Continue Shopping");
        });
    }


    const saveAddressToDb=() =>
    {
        saveUserAddress(user.token,address)
        .then((res)=>{
            setAddressSaved(true)
            toast.success('Address saved');
        }
            )
    };
    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br/>
                <br/>
                <ReactQuill theme="snow" value={address}
                onChange={setAddress} />
                <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>Save</button>
               <hr/> 
               <h4>Got Coupon?</h4>
               <br/>
               Coupon Input
            </div>
          <div className="col-md-6">
              <h4>Order Summary</h4>
              <hr/>
    <p>Products {products.length}</p>
              <hr/>
              {products.map((p,i)=>(
                <div key={i}>
                    <p>{p.product.title} ({p.color}) x {p.count}={" "}
                    {p.product.price * p.count}
                    </p>
                    </div>
              ))}
              <hr/>
              <p>Cart Total:{total}</p>
              <div className="row">
                  <div className="col-md-6">
                      <button className="btn btn-primary"
                      disabled={!addressSaved || !products.length}>
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
