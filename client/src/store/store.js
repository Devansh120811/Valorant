import { configureStore } from "@reduxjs/toolkit";
import authslice from './authslice.js'
export const store = configureStore({
    reducer: {
        auth: authslice
    }
})
export default store