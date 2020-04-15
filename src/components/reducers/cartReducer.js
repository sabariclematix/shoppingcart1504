import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
  GET_PRODUCTS,
  GET_PRODUCT,
  UPDATE_ATTRIBUTE,
  PROMOCODE
} from "../actions/action-types/cart-actions";

const initState = {
  items: [],
  addedItems: [],
  total: 0,
  grandTotal:0,
  promoCode:0,
  promoCodePrice:0,
  shipingPrice:6
};
function checkGrandPrice(total,promoCodePrice){
return total-promoCodePrice+(total<=50?6:0)
}
const cartReducer = (state = initState, action) => {
  //INSIDE HOME COMPONENT
  if (action.type === GET_PRODUCTS) {
    let addedItems = action.items.map(item=>{
        return {
            ...item,
            quantity:item.p_quantity
          }
        }
      )
    let price = action.items.map(item=>item.p_price);
    let total = price.reduce((total,value)=>total+value);
    return {
      ...state,
      addedItems : addedItems,
      items: action.items,
      total:total,
      grandTotal:checkGrandPrice(total,state.promoCodePrice)
    };
  }
  if (action.type === UPDATE_ATTRIBUTE) {
    let option = action.option=='color'?'p_selected_color':'p_selected_size';
    let items = state.addedItems.map(item => {
     return item.p_id === action.id?{...item,[option]: action.value}:item
    });
    return {
      ...state,
      addedItems : items
    }
  }
  if (action.type === ADD_TO_CART) {
    let addedItem = state.items.find(item => item.id === action.id);
    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find(item => action.id === item.id);
    if (existed_item) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + addedItem.price,
        grandTotal:checkGrandPrice((state.total + addedItem.price),state.promoCodePrice)
      };
    } else {
      addedItem.quantity = 1;
      //calculating the total
      let newTotal = state.total + addedItem.price;
      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
        grandTotal:checkGrandPrice(newTotal,state.promoCodePrice)
      };
    }
  }
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.addedItems.find(item => action.id === item.p_id);
    let new_items = state.addedItems.filter(item => action.id !== item.p_id);

    //calculating the total
    let newTotal = state.total - itemToRemove.p_price * itemToRemove.p_quantity;
    return {
      ...state,
      addedItems: new_items,
      total: newTotal,
      grandTotal:checkGrandPrice(newTotal,state.promoCodePrice)
    };
  }
  //update promo code
  if (action.type === PROMOCODE) {
    let promoCodePrice=0;
    let promoCode=0;
    if('AJ10'==action.promoCode){
      promoCodePrice = 5.60;
      promoCode=1;
    }else if(state.promoCode==1){
      promoCodePrice=0;
    }
    return {
      ...state,
      grandTotal:checkGrandPrice(state.total,promoCodePrice),
      promoCodePrice,
      promoCode:promoCode
    };
  }
  //INSIDE CART COMPONENT
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.addedItems.find(item => item.p_id === action.id);
    let price = addedItem.p_quantity*addedItem.p_price;
    let reduceTotal = state.total - price;
    addedItem.p_quantity = parseInt(action.quantity);
    let newTotal = reduceTotal + (parseInt(action.quantity) * addedItem.p_price);
    let items = state.addedItems.map(item => {
      return item.p_id === action.id?{...item,p_quantity: parseInt(action.quantity)}:item
     });
    return {
      ...state,
      addedItems : items,
      total: newTotal,
      grandTotal:checkGrandPrice(newTotal,state.promoCodePrice),
    };
  }
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find(item => item.id === action.id);
    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter(item => item.id !== action.id);
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
        grandTotal:newTotal
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        total: newTotal,
        grandTotal:newTotal
      };
    }
  }

  if (action.type === ADD_SHIPPING) {
    return {
      ...state,
      grandTotal: state.total + 6
    };
  }

  if (action.type === "SUB_SHIPPING") {
    return {
      ...state,
      grandTotal: state.total - 6
    };
  } else {
    return state;
  }
};

export default cartReducer;
