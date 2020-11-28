import React from 'react'
import {Card, Tabs} from 'antd';
import {Link} from 'react-router-dom';
import {HeartOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import ProductListItems from './ProductListItems'
const {TabPane} =Tabs;



const SingleProduct=({ product})=>{
    const {title,images, description} =product;
    return(
        <>
        <div className="col-md-7">
            {images &&images.length ?
            <Carousel showArrow={true} autoPlay infiniteLoop>
                {images && images.map((i)=><img src={i.url} key={i.public_id}/>)}
            </Carousel>:"No image"}
            <Tabs type="card">
                <TabPane tab= "Description" key="1" >
                    {description &&description}
                </TabPane>
                <TabPane tab= "Details" key="2" >
                    Call us on xxxxxxx to learn more about this product.
                </TabPane>
            </Tabs>
        </div>
        <div className="col-md-5">
            <h1 className="bg-info p-3">{title}</h1>
        <Card
            actions={[
                <>
                <ShoppingCartOutlined
                className="text-success"/> <br/>
                Add to Cart
                </>,
                <Link to ="/"> <HeartOutlined className="text-info"/> 
                <br/>
                 Add to wishlist</Link>,
            ]}
           >
            <ProductListItems product ={product}   />
            </Card>
    
        </div>
        </>

    )
}
export default SingleProduct
