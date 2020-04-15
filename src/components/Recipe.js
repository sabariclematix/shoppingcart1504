import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
const Recipe = props => {
  const [promoCode,setPromoCode] = useState('');
  const shipping = useRef("shipping");
  useEffect(() => {
    if (shipping.current.checked) props.substractShipping();
  }, []);
  console.log('count changed',props.shipingPrice)
  useEffect(() => {
    console.log('count changed', props.count);
}, [props.count])
  let handleChecked = e => {
    if (e.target.checked) {
      props.addShipping();
    } else {
      props.substractShipping();
    }
  };
  let applyPromoCode = () =>{
    if(promoCode!=''){
      props.promoCode(promoCode);
    }
  }
  let promoCodeValue = e => {
    if (e.target.value!='') {
      setPromoCode(e.target.value);
    }
  };
console.log(promoCode, props.promoCodeCheck);
  return (
    <div className="container">
      <div className="collection">
        <table>

        </table>
      <li className="collection-item">
          <label>
          <span>Enter promo code or gift cart</span>
            <input type="text" onChange={promoCodeValue} /><button style={{float:"right"}} className="waves-effect waves-light btn" onClick={()=>applyPromoCode()}>Apply</button>
          </label>
        </li>
        <li className="collection-item">
          <div style={{width:'100%'}}>Subtotal <span style={{float:'right'}}>$ {props.total}</span></div>
        </li>
        {promoCode!='' && props.promoCodeCheck==1?(<li className="collection-item">
          <div style={{width:'100%'}}>promo code applied <span style={{float:'right'}}>$ 5.60</span></div>
        </li>):null}
        <li className="collection-item">
          
          <div style={{width:'100%'}}>Estimated Shipping*<br/> 
          <label><span>Your quality for free shipping because your order is over $50</span>
          </label><span style={{float:'right'}}>{props.total<=50?'$ 6':'Free'}</span></div>
          
        </li>
        <li className="collection-item">
        <div style={{width:'100%'}}><b>Estimated Total: </b><span style={{float:'right'}}><b>$ {props.grandTotal}</b></span></div>
        </li>
      </div>
      <div className="checkout">
        <button className="waves-effect waves-light btn">Checkout</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    addedItems: state.addedItems,
    total: state.total,
    grandTotal: state.grandTotal,
    promoCodeCheck: state.promoCode,
    shipingPrice:state.shipingPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addShipping: () => {
      dispatch({ type: "ADD_SHIPPING" });
    },
    substractShipping: () => {
      dispatch({ type: "SUB_SHIPPING" });
    },
    promoCode: (promoCode) => {
      dispatch({ type: "PROMOCODE",promoCode });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
