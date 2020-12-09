import React,{useState, useEffect} from 'react'
import {Card, Tabs,Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import {HeartOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import ProductListItems from './ProductListItems'
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import {showAverage} from '../../functions/rating';
import {useSelector,useDispatch} from 'react-redux';
import _ from 'lodash';
const {TabPane} =Tabs;



const SingleProduct=({ product,onStarClick,star})=>{
    const {title,images, description,_id} =product;
    const [tooltip,setTooltip]=useState('Click to add');
    const {user,cart} =useSelector((state) => ({ ...state }))
    const dispatch=useDispatch();
    const handleAddToCart=()=>{
        
        let cart=[];
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                cart=JSON.parse(localStorage.getItem('cart'));
            }
            cart.push({
                ...product,
                count:1,
            });
            let unique=_.uniqWith(cart,_.isEqual);
           // console.log(unique)
            localStorage.setItem('cart',JSON.stringify(unique));
            setTooltip('Added');

            dispatch({
                type:'ADD_TO_CART',
                payload:unique,
            });
            dispatch({
                type:'SET_VISIBLE',
                payload:true,
            })
        }
    }
    return(
        <>
        <div className="col-md-7">
            {images &&images.length ?
            <Carousel showArrow={true} autoPlay infiniteLoop>
                {images && images.map((i)=><img src={i.url} key={i.public_id}/>)}
            </Carousel>:"No image"}
            <Tabs type="card">
                <TabPane tab= "Description" key="1" >
                    {description && description}
                </TabPane>
                <TabPane tab= "Details" key="2" >
                    Call us on xxxxxxx to learn more about this product.
                </TabPane>
            </Tabs>
        </div>
        <div className="col-md-5">
            <h1 className="bg-info p-3">{title}</h1>
            {product && product.ratings && product.ratings.length>0?(
            showAverage(product)
            ):(
            <div className="text-center pt-1 pb-3">No rating yet</div>)}
        <Card
            actions={[
                <Tooltip title={tooltip}>
        <a onClick={handleAddToCart}>
    <ShoppingCartOutlined className="text-danger"/><br/> Add to Cart
    </a>,
    </Tooltip>,
                <Link to ="/"> <HeartOutlined className="text-info"/> 
                <br/>
                 Add to wishlist</Link>,
                 <RatingModal>
                 <StarRating
                 name={_id}
                 numberOfStars={5}
                 rating={star}
                 changeRating={onStarClick}
                 isSelectable={true}
                 starRatedColor="blue"/>
                 </RatingModal>
            ]}
           >
            <ProductListItems product ={product}   />
            </Card>
    
        </div>
        </>

    )
}
export default SingleProduct
