import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import {
  addToCart,
  removeItem,
  addQuantity,
  updateAttribute
} from "./actions/cartActions";
const Productdetail = props => {
  const [item, setItem] = useState([]);
  const [attribute, setAttribute] = useState([]);
  // add product list
  useEffect(() => {
    let itemDetail = props.items.find(item => item.p_id === props.id);
    setItem(itemDetail);
  }, []);
  //to add the quantity
  const handleAddQuantity = (e) => {
    if(e.target.value!="" && e.target.value!=0){ 
        setAttribute({...attribute,'quantity':e.target.value}) 
    }
  };
  //to substruct from the quantity
  const updateColor = (color) => {
    setAttribute({...attribute,'color':color})
  };
  const updateSize = (value) => {
    let size = item.p_available_options.sizes.find((item,index)=>index===parseInt(value.target.value))
    setAttribute({...attribute,'size':size})
  };
  const updateData = () => {
    if(attribute['quantity']){
        props.addQuantity(item.p_id,attribute['quantity']);
    }
    if(attribute['color']){
        props.updateAttribute(item.p_id,'color',attribute['color']);
    }
    if(attribute['size']){
        props.updateAttribute(item.p_id,'size',attribute['size']);
    }  
    props.handleClose();  
    
  };

  let addedItems = item && item.p_id ? (
        <li className="collection-item avatar">
             <div className="item-desc">
            <span className="title pop-title">{item.p_name}</span>
            <p className="item-price">
              <b>{item.c_currency} {item.p_price}</b>
            </p>
            <span className="title">
                <div style={{marginBottom: '5px'}}>
                    {item.p_style}
                </div>
            {
                item.p_available_options && item.p_available_options.colors?(<ul className="option-color">{
                item.p_available_options.colors.map(item=>(<li onClick={()=>updateColor(item)} style={{'backgroundColor':item.hexcode}}></li>))}</ul>):null}
                Color : {attribute.color?attribute.color.name:item.p_selected_color.name}</span>
            <span className="title">Size : {
                item.p_available_options && item.p_available_options.sizes?(<select onChange={(e)=>updateSize(e)} className="option-size">{
                item.p_available_options.sizes.map((item,index)=>(<option value={index}>{item.name}</option>))}</select>):null}</span>    
           
            <p>
              <b>Quantity: <input type="text" onChange={(e)=>handleAddQuantity(e)} defaultValue={item.quantity} /> </b>
            </p>
            <button className="waves-effect waves-light btn pink remove" onClick={()=>updateData()}>Edit</button>
          </div>
          <div className="item-img">
            <img src={item.p_image} alt={item.p_name} className="" />
          </div>

         
        </li>
  ) : (
    <p>Nothing.</p>
  );
  return (
    <div className="container inner-box"> 
      <div className="cart">
      <button
    className="waves-effect waves-light btn pink remove closebutton"
    onClick={() => props.handleClose()}
  >
    Close
  </button>
        <ul className="collection">{addedItems}</ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    items: state.addedItems,
    addedItems: state.addedItems
  };
};
const mapDispatchToProps = dispatch => {
  return {
    productList: () => {
      dispatch({ type: "GET_PRODUCTS_SERVICE" });
    },
    addToCart: id => {
      dispatch(addToCart(id));
    },
    removeItem: id => {
      dispatch(removeItem(id));
    },
    addQuantity: (id,quantity) => {
      dispatch(addQuantity(id,quantity));
    },
    updateAttribute: (id,option,value) => {
      dispatch(updateAttribute(id,option,value));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Productdetail);
