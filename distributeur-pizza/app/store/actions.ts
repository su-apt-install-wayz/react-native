export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
}

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Item;
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: number; // Assume id is a number
}

export type CartActionTypes = AddToCartAction | RemoveFromCartAction;

export const addToCart = (item: Item): AddToCartAction => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId: number): RemoveFromCartAction => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});
