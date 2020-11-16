import React,{useState, useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
const  RegisterComplete=({history})=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    useEffect(()=>{
        setEmail(window.localStorage.getItem('emailForRegistration'));
        console.log(window.location.href);
    },[])

    const handleSubmit=async (e)=>{
        e.preventDefault();
        //validation
        if(!email ||!password){
            toast.error('Email and password are required');
            return;
        }
        if(password.length<3){
            toast.error('Password must be atleast 3 characters');
            return;
        }
        try{
            const res= await auth.signInWithEmailLink(email,window.location.href);
            console.log(res);
        if(res.user.emailVerified){
            //remove user email from local storage
            window.localStorage.removeItem("emailForRegistration");
            //get user id token from
            let user=auth.currentUser
            await user.updatePassword(password);
            const idToken= await user.getIdToken();
            console.log('user'+user);
            console.log('idToken'+idToken);
            //redux store 

            //redirect
            history.push('/');
        }
        }
        
        catch(err){ 
            console.log(err);
           // toast.error(err.message);
        }

    };
    const completeRegistrationForm=()=>(
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
            
            {completeRegistrationForm()}
        </div>
        </div>
        </div>
    )
}

export default RegisterComplete;