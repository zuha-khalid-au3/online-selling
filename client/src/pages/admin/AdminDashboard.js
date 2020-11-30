import React,{useState, useEffect} from 'react'
import AdminNav from '../../components/Navbar/AdminNav'
const AdminDashboard =() => {
  
    return (
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-2">
            <AdminNav/>
        </div>
        <div className="col">
        <h4>Admin Dashboard</h4>
    </div>
    </div>
    </div>
    );
};

export default AdminDashboard;




// import React,{useState, useEffect} from 'react'
// import AdminNav from '../../components/Navbar/AdminNav';
// import AdminProductCard from '../../components/cards/AdminProductCard';
// import {getProductsByCount} from '../../functions/product';

// const AdminDashboard =() => {
//     const [products,setProducts]=useState([]);
//     const [loading, setLoading]= useState(false);

//     useEffect(() => {
//       loadAllProducts();  
//     },[])
//   const loadAllProducts =() => {
//       setLoading(true);
//     getProductsByCount(100)
//     .then((res)=>{
//     setProducts(res.data)
//     setLoading(false)
//     })
//     .catch((err)=>{
//         setLoading(false)
//         console.log(err)});
//   }
//     return (
//         <div className="container-fluid">
//         <div className="row">
//         <div className="col-md-2">
//             <AdminNav/>
//         </div>
       
//         <div className="col">
//         {loading?(<h4 className="text-danger">Loading...</h4>):
//         (
//             <h4>All Products</h4>
//         )}
//             <div className="row">
//             {products.map((p)=>(
//             <div key={p._id} className="col-md-4">
//                 <AdminProductCard product ={p}/>
//                 </div>
//             ))}
//             </div>
//     </div>
//     </div>
//     </div>
//     );
// };

// export default AdminDashboard;