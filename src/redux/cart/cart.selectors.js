import {createSelectors} from "reselect";


const selectCart = state => state.selectCart;

export const selectCartItems = createSelectors(
    [selectCart],
    cart => cart.cartItems
)

export const selectCartItemsCount = createSelectors(
    [selectCartItems],
    cartItems => CartItems.reduce((accumulatedQuantity, cartItem) => 
    accumulatedQuantity + cartItem.quantity,0)
)