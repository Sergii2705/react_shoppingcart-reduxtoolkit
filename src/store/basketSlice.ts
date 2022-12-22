import { ShoppingCartItem } from "../modules/shopping-cart/modules";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ShoppingCartItem[] = [];

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (basket, action) => {
      if (basket.find(item => item.productId === action.payload.productId)) {
        return basket.map(item => {
          if (item.productId === action.payload.productId) {
            return { productId: item.productId, quantity: item.quantity + action.payload.quantity }
          }
          
          return item
        })
      }
      
      basket.push(action.payload)
    },
    
    deleteItem: (basket, action) => {
      return basket.filter(({ productId }) => productId !== action.payload);
    },

    increaseItem: (basket, action) => {
      return basket.map(item => {
        if (item.productId === action.payload) {
          return { productId: item.productId, quantity: item.quantity + 1}
        } 
          
        return item 
      })
    }, 

    decreaseItem: (basket, action) => {
      const idx = basket.findIndex(({ productId }) => productId === action.payload)
      if (idx === -1) {
        return;
      }

      if (basket[idx].quantity > 1) {
        basket[idx].quantity -= 1; 
      } else {
        basket.splice(idx, 1);
      }
    },

    clearAll: () => {
      return [];
    },
  }
});

export default basketSlice.reducer;
export const { actions } = basketSlice;


