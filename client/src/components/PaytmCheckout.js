import React,{useState, useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {createPaymentIntent}= '../functions/paytm';

export const StripeCheckout = ({history}) => {
    const dispatch=useDispatch();
    const {user} = useSelector((state) => ({ ...state}));

    const [succeeded,setSucceeded]=useState(false);
    const [error,setError]=useState(null);
    const [processing,setProcessing]=useState(true);
    const [disabled,setDisabled]=useState(true);
    const [clientSecret,setClientSecret]=useState("");

    return (
        <div>
            
        </div>
    )
}
