import React,{useEffect} from 'react'
import {Switch, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
 import Login from './pages/auth/Login'
 import Register from './pages/auth/Register'
 import Home from './pages/Home'
  import Header from './components/Navbar/Header'
  import RegisterComplete from './pages/auth/RegisterComplete'
  import ForgotPassword from './pages/auth/ForgotPassword'
  import {auth} from './firebase';
  import {useDispatch} from 'react-redux';
  import {currentUser} from './functions/auth';

const App=() =>{
  const dispatch=useDispatch();

  useEffect(() => {
    const unsubscribe=auth.onAuthStateChanged(async(user)=>{
      if(user){
        const idToken=await user.getIdTokenResult();
        console.log(user)
        currentUser(idToken.token)
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
        }).catch(err=>console.log(err));
      }
    })
    return ()=>unsubscribe();
  },[])
  return (
    <>
    <Header/>
    <ToastContainer/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/register/complete" component={RegisterComplete}/>
      <Route exact path="/forgot/password" component={ForgotPassword}/>
    </Switch>
    </>
  );
}

export default App;