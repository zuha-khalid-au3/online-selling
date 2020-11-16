import React,{useState, useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
const  RegisterComplete=({history})=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    useState(()=>{
        setEmail(window.localStorage.getItem('emailForRegistration'));
    },[])

    const handleSubmit=async (e)=>{
        e.preventDefault();
    const config={ url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp:true,
    };
    await auth.sendSignInLinkToEmail(email,config);
    toast.success(`Email sent to ${email}.Click link to complete your registration`);
    window.localStorage.setItem('emailForRegistration',email);
    setEmail('');
    };
    const CompleteRegistrationForm=()=>(
    <form onSubmit={handleSubmit}>
        <input type="email"className="form-control" value={email} disabled/>
        <input type="password"className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" autoFocus/>
        <button type="submit" className="btn btn-raised">Register</button>
    </form>
    );
    return (
        <div className="container p-5">
        <div className="row">
        <div className="col-md-6 offset-md-3">
            <h4>Register</h4>
            
            {CompleteRegistrationForm()}
        </div>
        </div>
        </div>
    )
}

export default RegisterComplete;