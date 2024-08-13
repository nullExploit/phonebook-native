import { configureStore } from "@reduxjs/toolkit";
import phoneBookReducer from "@/lib/redux/phonebooks/PhoneBookSlice";


export const store = configureStore({
  reducer: {
    phonebooks: phoneBookReducer
  }
})
