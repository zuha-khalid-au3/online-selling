import React,{useState,useEffect} from 'react';
import {auth,googleAuthProvider} from '../../firebase';
import {toast,ToastContainer} from 'react-toastify';
import {Button} from 'antd';
import { AppstoreOutlined,GoogleOutlined,LogoutOutlined, SettingOutlined, UserOutlined,UserAddOutlined,MailOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
// import "react-toastify/dist/ReactToastify.css";
const  Login=({history})=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const {user}= useSelector((state) => ({ ...state }));

    useEffect(()=>{
        if(user&&user.token)
        history.push('/')
    },[user])
    let dispatch=useDispatch();
    

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const res= await auth.signInWithEmailAndPassword(email,password);
            const {user}=res
            const idToken= await user.getIdTokenResult()
            //console.log(res);
            dispatch({
                type:'LOGGED_IN_USER',
                payload:{
                    email:user.email,
                    token:idToken.token
                },
            });
            history.push('/')
        }
        catch(err){
            console.log(err);
            toast(err.message);
            setLoading(false);
        }
    };
    const googleLogin= async ()=>{
        auth.signInWithPopup(googleAuthProvider)
        .then(async(res)=>{
            const {user}=res;
            const idToken= await user.getIdTokenResult();
            dispatch({
                type:'LOGGED_IN_USER',
                payload:{
                    email:user.email,
                    token:idToken.token
                },
            });
            history.push('/')
        })
        .catch((err) =>{
            toast.error(err.message);
        });
    }
    const LoginForm=()=>(
    <form onSubmit={handleSubmit}>
      <div className="form-group">
      <input
         type="email"
         className="form-control"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         placeholder="Your email"
         autoFocus
         />
      </div>
      <div className="form-group">
        <input
         type="password"
         className="form-control"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         placeholder="Enter Password"
         autoFocus/> 
         </div>
         <br/>
        <Button onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined/>}
        size="large"
        disabled={!email||password.length<3}
        >Login</Button>
    </form>
    );
    return (
        <div className="container p-5">
        <div className="row">
        <div className="col-md-6 offset-md-3">
            
           {!loading?<h4>Login</h4>:<h4 className="text-danger">Loading</h4>} 
            {LoginForm()}
        <Button onClick={googleLogin}
        type="danger"
        className="mb-3"
        block
        shape="round"
        icon={<GoogleOutlined/>}
        size="large"
        >Login with Google</Button>    
        <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password </Link>
        </div>
        </div>
        </div>
    )
}
//Exported
export default Login;