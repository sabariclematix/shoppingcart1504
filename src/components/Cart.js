import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import {
  addToCart,
  removeItem,
  addQuantity,
  subtractQuantity
} from "./actions/cartActions";
import Recipe from "./Recipe";
import Productdetail from './Productdetail';

const Cart = props => {
  const [itemId,setOpen] = useState(0)
  // add product list
  useEffect(() => {
    props.productList();
    //props.addToCart(1);
  }, []);

  //to remove the item completely
  const handleRemove = id => {
    props.removeItem(id);
  };
  //to add the quantity
  const handleAddQuantity = (id,e) => {
    if(e.target.value!="" && e.target.value!=0){
      props.addQuantity(id,e.target.value); 
    }
  };
  //to substruct from the quantity
  const handleSubtractQuantity = id => {
    props.subtractQuantity(id);
  };
  //to edit the item
  const handleEdit = id => {
    setOpen(id)
  };
  //to edit the item
  const handleClose = () => {
    setOpen(0)
  };

  let addedItems = props.items.length ? (
    props.items.map(item => {
      return (
        <li className="collection-item avatar" key={item.p_id}>
          <div className="item-img">
            <img src={item.p_image} alt={item.p_name} className="" />
          </div>

          <div className="item-desc">
            <span className="title">{item.p_name}</span>
            <span className="title">Style# : {item.p_style}</span>
            <span className="title">color : {item.p_selected_color.name}</span>
            <span className="title">Size : {item.p_selected_size.code}</span>
            <p>{item.desc}</p>
            <p>
              <b>Price: {item.p_price}$</b>
            </p>
            <p>
              <b>Quantity: <input type="text" onChange={(e)=>handleAddQuantity(item.p_id,e)} defaultValue={item.p_quantity} /></b>
            </p>
            <button
              className="waves-effect waves-light btn pink remove"
              onClick={() => {
                handleRemove(item.p_id);
              }}
            >
              Remove
            </button>
            &nbsp;
            <button
              className="waves-effect waves-light btn pink remove"
              onClick={() => {
                handleEdit(item.p_id);
              }}
            >
              Edit
            </button>
          </div>
        </li>
      );
    })
  ) : (
    <p>Nothing.</p>
  );
  return (
    <div className="container">
      <div className="cart">
        <h5>You have ordered:</h5>
        <ul className="collection">{addedItems}</ul>
      </div>
      <Recipe />
      {itemId!=0?(<><div className="pop-box"><Productdetail id={itemId} handleClose={handleClose} /></div><div className="pop-box-back"></div></>):null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    items: state.addedItems,
    itemss: state.items,
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
    subtractQuantity: id => {
      dispatch(subtractQuantity(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
