import React,{useState, useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import axios from 'axios';
import {useDispatch} from 'react-redux';


const createOrUpdateUser=async(authtoken)=>{
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`,
        {},
        {
        headers:{
            authtoken:authtoken,
        },
    });
}

    const  RegisterComplete=({history})=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    //const {user}= useSelector((state) => ({ ...state }));
    let dispatch=useDispatch();    

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
           // console.log('user'+user);
           // console.log('idToken'+idToken);
            //redux store 

            createOrUpdateUser(idToken.token)
            .then((res)=>{
                dispatch({
                    type:"LOGGED_IN_USER",
                    payload:{
                        name:res.data.name,
                        email:res.data.email,
                        token:idToken.token,
                        role:res.data.role,
                        _id:res.data._id,
                    },
                });
            }).catch();

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