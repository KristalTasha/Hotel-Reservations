import { configureStore } from "@reduxjs/toolkit";
import reservationsReducer from './slices/reservationSlice'


export const store = configureStore({
    reducer: {
        reservations: reservationsReducer
    }
})