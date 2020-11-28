import React, { useState, useEffect} from 'react';
import AdminNav from '../../../components/Navbar/AdminNav';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';
import {createProduct, removeProduct } from '../../../functions/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import {getCategories,getCategorySubs} from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import {LoadingOutlined} from '@ant-design/icons'


const ProductCreate = () => {
    const initialState = {
        title:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        subs:[],
        shipping:'',
        quantity:'',
        images:[],
        colors:["Black","Brown","Silver","White","Blue"],
        brands:['Apple', 'Samsung','Microsoft','Lenovo','Asus'],
        color:'',
        brand:''
    }
    const [values,setValues] =useState(initialState);
    const [subOptions,setSubOptions] =useState([]);
    const [showSub,setShowSub] =useState(false);
    const [loading, setLoading]=useState(false);

    const {user} =useSelector((state) => ({ ...state }));
    useEffect(() => {
        loadCategories();
    },[]);
    
    const loadCategories = () => 
    getCategories().then((c) => setValues({...values,categories:c.data}));    
    
    const handleSubmit= (e)=>{
        e.preventDefault();
        createProduct(values,user.token)
        .then(res =>{
            window.alert(`"${res.data.title}" is created`);
            window.location.reload();
        })
        .catch(err =>{
            console.log(err)
            //if(err.response.status === 400 ) toast.error(err.response.data)
            toast.error(err.response.data.err);
        })

    }


    const handleChange=(e) =>{
        setValues({...values,[e.target.name]:e.target.value})
    }

    const handleCategoryChange=(e) =>{
        e.preventDefault();
        setValues({...values,subs:[],category:e.target.value});
        getCategorySubs(e.target.value)
        .then(res=>{
            setSubOptions(res.data);
        });
        setShowSub(true);
    }


return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
                </div>
            <div className="col-md-10">
             {loading? (<LoadingOutlined 
             className="text-danger h1"/>
             ):(<h4> Product create </h4>
             )}       
                 <hr/>
                 
     <div className="p-3">
         <FileUpload 
         values={values}
          setValues={setValues} 
          setLoading={setLoading}/>
         </div>            
    <ProductCreateForm 
    handleSubmit={handleSubmit}
    handleChange={handleChange}
    values={values}
    setValues={setValues}
    handleCategoryChange={handleCategoryChange}
    subOptions={subOptions}
    showSub={showSub} />
                </div>    
        </div>
    </div>
)
}
export default ProductCreate;