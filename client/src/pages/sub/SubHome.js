import React,{useState, useEffect} from 'react'
import {getSub} from '../../functions/sub';
import ProductCard from '../../components/cards/ProductCard';

function SubHome({match}) {
    const [sub,setSub] = useState({});
    const [products,setProducts]=useState([]);
    const [loading, setLoading]=useState(false);

    const {slug} = match.params;

    useEffect(() => {
        setLoading(true);
        getSub(slug).then(
            (c) =>{
                setSub(c.data.category)
                setProducts(c.data.products);
                setLoading(false)
            })
    },[])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    {loading?(
                   <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Loading... </h4>     
                    ):(
                       <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron"> 
                       {products.length} Products found in {sub.name} Sub category
                       </h4>
                    )}
                </div>
            </div>

            <div className="row">
                {products.map((product) =>(
                    <div className="col-md-4" key={product._id}>
                <ProductCard product={product}/>
                </div>
                ))}
            </div>
            
        </div>
    )
}

export default SubHome
