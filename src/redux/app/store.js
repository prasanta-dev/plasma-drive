import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../features/authSlice'
import cartReducer from '../features/cartSlice'
import bagIconStateReducer from "../features/bagIconEffectSlice"
import searchSliceReducer from "../features/searchSlice"
import selectServiceSliceReducer from '../features/selectServiceSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        bagIconEffect: bagIconStateReducer,
        search: searchSliceReducer,
        selectService: selectServiceSliceReducer
    },
})