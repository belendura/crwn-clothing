import {cartActionTypes} from "./cart.types";

export const toogleCartHidden= () =>({
    type: cartActionTypes.TOOGLE_CART_HIDDEN,   
});

export const addItem= item =>({
    type: cartActionTypes.ADD_ITEM,
    payload:item,
});