import React,{useState} from 'react';
import {auth} from '../../firebase';
import {toast,ToastContainer} from 'react-toastify';
import {Button} from 'antd';
import { AppstoreOutlined,LogoutOutlined, SettingOutlined, UserOutlined,UserAddOutlined,MailOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
// import "react-toastify/dist/ReactToastify.css";
const  Login=({history})=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
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
            <h4>Login</h4>
            
            {LoginForm()}
        </div>
        </div>
        </div>
    )
}
//Exported
export default Login;