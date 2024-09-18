import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Pizza {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  quantity: number;
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
    addToCart(state, action: PayloadAction<Pizza>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; //Augmente la quantité si l'article existe déjà
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); //Ajoute un nouvel article
      }
    },
    updateQuantity(state, action: PayloadAction<{ id: number; action: 'increment' | 'decrement' }>) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.action === 'increment') {
          item.quantity += 1;
        } else if (action.payload.action === 'decrement' && item.quantity > 1) {
          item.quantity -= 1;
        }
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;