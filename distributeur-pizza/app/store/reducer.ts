import { ADD_TO_CART, REMOVE_FROM_CART, CartActionTypes, Item } from './actions';

interface CartState {
  cart: Item[];
}

const initialState: CartState = {
  cart: [],
};

const cartReducer = (state = initialState, action: CartActionTypes): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
