import React,{useState} from 'react';
import {auth} from '../../firebase';
import {toast,ToastContainer} from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
const  Login=()=>{
    const [email,setEmail]=useState('');
    const handleSubmit=async (e)=>{
        e.preventDefault();
    const config={ url: process.env.REACT_APP_Login_REDIRECT_URL,
        handleCodeInApp:true,
    };
    await auth.sendSignInLinkToEmail(email,config);
    toast.success(`Email sent to ${email}.Click link to complete your registration`);
    window.localStorage.setItem('emailForRegistration',email);
    setEmail('');
    };
    const LoginForm=()=>(
    <form onSubmit={handleSubmit}>
        <input
         type="email"
         className="form-control"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         placeholder="Your email"
         autoFocus/>
         <br/>
        <button type="submit" className="btn btn-raised">Login</button>
    </form>
    );
    return (
        <div className="container p-5">
        <div className="row">
        <div className="col-md-6 offset-md-3">
            <h4>Login</h4>
            
            {LoginForm()}
        </div>
        </div>
        </div>
    )
}
//Exported
export default Login;