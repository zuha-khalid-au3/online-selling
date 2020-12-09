import React,{useEffect,useState} from 'react'
import {getProductsByCount,fetchProductsByFilter} from '../functions/product';
import{getCategories} from '../functions/category';
import{getSubs} from '../functions/sub';
import {useSelector,useDispatch} from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import {Menu,Slider,Checkbox, Radio} from 'antd';
import {DollarOutlined,StarOutlined,DownSquareOutlined} from '@ant-design/icons';
import Star from '../components/forms/Star'

const {SubMenu,ItemGroup} = Menu
const Shop = () => {
    const [products,setProducts]=useState([]);
    const [loading, setLoading]=useState(false);
    const [price,setPrice]=useState([0,0]);
    const [ok,setOk]=useState(false);
    const [categories, setCategories]=useState([]);
    const [categoryIds,setCategoryIds]=useState([]);
    const [star,setStar]=useState('');
    const [sub, setSub] = useState('')
    const [subs, setSubs] = useState([]);
    const [brands,setBrands]=useState([
        'Apple',
        'Samsung',
        'Microsoft',
        'Lenovo',
        'Asus'
    ]);

    const [brand,setBrand]=useState('');
    const [colors,setColors]=useState([
        'Black', 'Brown','Silver','White','Blue'
    ]);
    const [color,setColor]=useState('');
    const [shipping,setShipping]=useState('');
    let {search} =useSelector((state) => ({ ...state }));
    const {text} =search;
    let dispatch=useDispatch();

const loadAllProducts =() => {
    getProductsByCount(12).then((p)=>{
        setProducts(p.data);
        setLoading(false);
    });
};

const fetchProducts=(arg) => {
    fetchProductsByFilter(arg).then((res) => {
        setProducts(res.data);
    });
}

const handleSlider=(value) => {
    dispatch({
        type: 'SEARCH_QUERY',
        payload: {
            text:""
        },
    });
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');
    setTimeout(() => {
        setOk(!ok)
    },300);
}

const handleCheck =(e)=>{
    dispatch({
        type:'SEARCH_QUERY',
        payload: {
            text:""
        },
    });
    setPrice([0,0]);
    setStar("");
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');
    let inState =[...categoryIds];
    let justChecked = e.target.value;
    let found= inState.indexOf(justChecked);

    if(found ===-1){
        inState.push(justChecked)
    }else{
      inState.splice(found,1);  
    }

    setCategoryIds(inState);
    fetchProducts({category:inState});
}

const showCategories =()=>
    categories.map((c)=>(
    <div key= {c._id}>
        <Checkbox 
        onChange = {handleCheck}
        className="pb-2 pl-4 pr-4"
        value={c._id}
        name="category"
        checked={categoryIds.includes(c._id)}
        >{c.name}
        </Checkbox>
        <br/>
    </div>
    ));



useEffect(() => {
    loadAllProducts();
    getCategories().then((c) =>setCategories(c.data));

    getSubs().then((c)=>setSubs(c.data));
},[]);

useEffect(() => {
    const delayed=setTimeout(()=>{
        fetchProducts({query:text});
        if(!text){
            loadAllProducts();
        }
    },300)
    return ()=>clearTimeout(delayed);

},[text]);

useEffect(() => {
fetchProducts({price});
},[ok])

const handleStarClick=(num)=>{
    dispatch({
        type:'SEARCH_QUERY',
        payload: {
            text:""
        },
    });
    setPrice([0,0]);
    setCategoryIds([]);
    setStar(num);
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');
    fetchProducts({stars:num});
}
const showStars =()=>(
    <div className="pr-4 pl-4 pb-2">
        <Star starClick={handleStarClick}
        numberOfStars={5}/>
        <Star starClick={handleStarClick}
        numberOfStars={4}/>
        <Star starClick={handleStarClick}
        numberOfStars={3}/>
        <Star starClick={handleStarClick}
        numberOfStars={2}/>
        <Star starClick={handleStarClick}
        numberOfStars={1}/>
    </div>
)

const showSubs =()=>
    subs.map((s)=>(
        <div
        key={s._id}
        onClick={()=>handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{cursor:"pointer"}}
        >
            {s.name}
            {/* {console.log(s.name)} */}
        </div>
    ))

const handleSub=(sub)=>{
   setSub(sub);
   dispatch({
    type:'SEARCH_QUERY',
    payload: {
        text:""
    },
});
setPrice([0,0]);
setCategoryIds([]);
setStar('');
setBrand('');
setColor('');
setShipping('');
fetchProducts({sub});
}

const showBrands =()=>
brands.map((b)=>(
    <Radio
        value={b}
        name={b}
        checked={b===brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4">
            {b}
        </Radio>
));

const handleBrand =(e)=>{
    setSub('');
   dispatch({
    type:'SEARCH_QUERY',
    payload: {
        text:""
    },
});
setPrice([0,0]);
setCategoryIds([]);
setStar('');
setColor('');
setShipping('');
setBrand(e.target.value);
fetchProducts({brand:e.target.value});

}


const showColors =()=>
colors.map((c)=>(
    <Radio 
        value={c}
        name={c}
        checked={c===color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4">
            {c}
        </Radio>
));

const handleColor =(e)=>{
    setSub('');
   dispatch({
    type:'SEARCH_QUERY',
    payload: {
        text:""
    },
});
setPrice([0,0]);
setCategoryIds([]);
setStar('');
setBrand('');
setShipping('');
setColor(e.target.value)
fetchProducts({color:e.target.value});

};

const showShipping =()=>(
    <>
    <Checkbox className="pb-2 pl-4 pr-4"
    onChange={handleShipping}
    value='Yes'
    checked={shipping==='Yes'}> Yes
</Checkbox>
    <Checkbox className="pb-2 pl-4 pr-4"
    onChange={handleShipping}
    value='No'
    checked={shipping==='No'}>
        No
        </Checkbox>
    </>
);

const handleShipping =(e)=>{
    setSub('');
    dispatch({
     type:'SEARCH_QUERY',
     payload: {
         text:""
     },
 });
 setPrice([0,0]);
 setCategoryIds([]);
 setStar('');
 setBrand('');
 setColor('')
 setShipping(e.target.value)
 fetchProducts({shipping:e.target.value});  
}


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    <h4>Search/Filter</h4>
                    <hr/>
            <Menu defaultOpenKeys ={['1','2','3','4','5','6','7']} mode="inline">
                <SubMenu key='1' title={
                <span className ="h6">
                    <DollarOutlined/>Price</span>} 
                    > <div>
                        <Slider className="ml-4 mr-4"
                        tipFormatter={v=>`₹${v}`}
                        range 
                        value={price}
                        max="100000"
                        onChange={handleSlider} />
                    </div>
                </SubMenu>

                <SubMenu key='2' title={
                    <span className ="h6">
                        <DownSquareOutlined/>Categories
                        </span>} 
                        >
                     <div style={{marginTop:"-10px"}}>
                         {showCategories()}
                           
                        </div>
                    </SubMenu>
                    <SubMenu key='3' title={
                    <span className ="h6">
                        <StarOutlined/>Rating
                        </span>} 
                        >
                     <div style={{marginTop:"-10px"}}>
                         {showStars()}
                           
                        </div>
                    </SubMenu>  
                
                    <SubMenu key='4' title={
                    <span className ="h6">
                        <DownSquareOutlined/> Sub Categories
                        </span>} 
                        >
                     <div style={{marginTop:"-10px"}}
                     className="pl-4 pr-4">
                         {showSubs()}
                           
                        </div>
                    </SubMenu>
                    <SubMenu key='5' title={
                    <span className ="h6">
                        <DownSquareOutlined/> Brands
                        </span>} 
                        >
                     <div style={{marginTop:"-10px"}}
                     className="pl-4 pr-4">
                         {showBrands()}
                           
                        </div>
                    </SubMenu> 

                   <SubMenu key='6' title={
                    <span className ="h6">
                        <DownSquareOutlined/> Colors
                        </span>} 
                        >
                     <div style={{marginTop:"-10px"}}
                     className="pl-4 pr-4">
                         {showColors()}
                           
                        </div>
                    </SubMenu> 

                     <SubMenu key='7' title={
                    <span className ="h6">
                        <DownSquareOutlined/> Shipping
                        </span>} 
                        >
                     <div style={{marginTop:"-10px"}}
                     className="pl-4 pr-4">
                         {showShipping()}
                           
                        </div>
                    </SubMenu>           
            </Menu>
        </div>
            <div className="col-md-9 pt-3">
                {loading?(
                    <h4 className="text-danger">Loading ...</h4>
                ): (
                    <h4 className="text-danger"> Products: </h4>
                )}
                {products.length<1 && <p>No products found</p>}

                <div className="row pb-5 mt-3">
                    {products.map((p)=>(
                       <div key={p._id} className="col-md-4">
                           <ProductCard product={p}/>
                           </div> 
                    ))}
                </div>
            </div>
            </div>
        </div>
    )
}

export default Shop
