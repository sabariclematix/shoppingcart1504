
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,UPDATE_ATTRIBUTE,PROMOCODE} from './action-types/cart-actions'

//add cart action
export const addToCart= (id)=>{
    return{
        type: ADD_TO_CART,
        id
    }
}
//remove item action
export const removeItem=(id)=>{
    return{
        type: REMOVE_ITEM,
        id
    }
}
//subtract qt action
export const subtractQuantity=(id)=>{
    return{
        type: SUB_QUANTITY,
        id
    }
}
//add qt action
export const addQuantity=(id,quantity)=>{
    return{
        type: ADD_QUANTITY,
        id,
        quantity
    }
}
//update attribute action
export const updateAttribute=(id,option,value)=>{
    return{
        type: UPDATE_ATTRIBUTE,
        id,
        option,
        value
    }
}
//update promo code action
export const updatePromoCode=(promoCode)=>{
    return{
        type: PROMOCODE,
        promoCode
    }
}