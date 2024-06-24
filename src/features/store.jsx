import { configureStore } from '@reduxjs/toolkit';  
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer: {
     orders: cartSlice,
    }
  });

  export default store;



