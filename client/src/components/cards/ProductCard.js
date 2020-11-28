import React from 'react'
import {Card} from 'antd';
import {EyeOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
const {Meta} =Card;
const ProductCard=({product})=>{

    const {images,title,slug,description}=product;
return(
<Card
cover={
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
    src={images && images.length ? images[0].url:"laptop"}
    style={{height:"150px",objectFit:"cover"}}
    className="p-1"
    />
}
actions={[
    <Link to={`/admin/product/${slug}`}>
        <EyeOutlined className="text-warning"/>
        <br/> View Product
    </Link>,
    <>
    <ShoppingCartOutlined className="text-danger"/><br/> Add to Cart
    </>
]}
>
    <Meta
    title={title}
    description={`${description && description.substring(0,40)}... `}
    />
    </Card>
)
}

export default ProductCard