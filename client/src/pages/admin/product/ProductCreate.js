import React, { useState, useEffect} from 'react';
import AdminNav from '../../../components/Navbar/AdminNav';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';
//import {createProduct, removeProduct } from '../../../functions/Product';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from  '@ant-design/icons';
//import ProductForm from '../../../components/forms/ProductForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const ProductCreate = () => {
return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
                </div>
            <div className="col-md-10">
                Product create form
                </div>    
        </div>
    </div>
)
}
export default ProductCreate;