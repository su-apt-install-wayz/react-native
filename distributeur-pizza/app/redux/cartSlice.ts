import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Pizza {
  id: number;
  name: string;
  price: number;
  image_url: string;
  ingredients: string[];
}

interface CartState {
  items: Pizza[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Pizza>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;