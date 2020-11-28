import React from 'react';
import {Select} from 'antd';
const {Option}=Select;

const ProductUpdateForm =({handleSubmit,
    handleChange,
    values,
    setValues,handleCategoryChange,
    categories,subOptions,
    arrayOfSubs,
    setArrayOfSubIds,selectedCategory,

})=>{
    const {title,description,price,category,subs,shipping,quantity,images,colors,brands,color,brand} =values;
    return(
   <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text"name="title" className="form-control" value={title} 
                    onChange={handleChange}/>
                </div>  
                <div className="form-group">
                    <label>Description</label>
                    <input type="text"name="description" className="form-control" value={description} 
                    onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="text"name="price" className="form-control" value={price} 
                    onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Shipping</label>
                    <select 
                    value={shipping === 'Yes'? 'Yes':'No'}
                    name="shipping"
                    className="form-control"
                    onChange={handleChange}>
                   </select>    
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                     type ="number"
                     name="quantity"
                     className="form-control"
                     value={quantity}
                    onChange={handleChange}
                    />                       
                </div>
                <div className="form-group">
                    <label>Color</label>
                    <select name="color"
                    value={color}
                    className="form-control"
                    onChange={handleChange}>
                    <option >Please select</option>
                    {colors.map(c=><option key={c} value={c}>
                        {c}
                    </option>)}
                    </select>    
                </div>
                <div className="form-group">
                    <label>Brand</label>
                    <select
                    value={brand}
                    name="brand" className="form-control"
                    onChange={handleChange}>
                    
                    {brands.map(b=><option key={b} value={b}>
                        {b}
                    </option>)}
                    </select>    
                </div>
                <div className="form-group">
                        <label> Category</label>
                        <select name="Parent Category" 
                        className="form-control"
                        onChange={handleCategoryChange}
                        value={selectedCategory?selectedCategory: category._id}>
                            <option>{category?category.name:'Please select'}</option>
                            {categories.length > 0 && categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
                        </select>
                    </div>
                    <div>
                <label> Sub Categories</label>
                <Select
                mode="multiple"
                style={{width: '100%'}}
                placeholder="Please Select"
                value={arrayOfSubs}
                onChange={(value)=>setArrayOfSubIds(value)}>
                    {subOptions.length && subOptions.map((s)=>(
                         <Option key ={s._id} value={s._id}>{s.name}</Option>
                    ))}
                   
                    <Option value="two">Option two</Option>
                </Select> 
                </div>


               <br/>
<button className="btn btn-outline-info">Save</button>
            </form>
    )};

  export default ProductUpdateForm;