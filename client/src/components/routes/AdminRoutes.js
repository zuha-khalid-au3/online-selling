import React,{useEffect,useState} from 'react'
import {Route} from 'react-router-dom'
import {useSelector} from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import {currentAdmin} from '../../functions/auth';
const AdminRoutes=({children, ...rest})=>{
    const {user} =useSelector((state) => ({ ...state }));
    const [ok,setOk]=useState(false);

    useEffect(()=>{
        if(user && user.token){
            currentAdmin(user.token)
            .then(res=>{
                console.log('CURRENT admin response');
                setOk(true);
            })
            .catch(err=>{
                console.log('Admin route error');
                setOk(false);
            })
        }
    },[user])
    return ok ?(<Route/>):
    (<LoadingToRedirect />
        );
};


export default AdminRoutes;