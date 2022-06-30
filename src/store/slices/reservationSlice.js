import { createSlice } from "@reduxjs/toolkit";

export const reservationSlice = createSlice({
    name: 'reservations',
    initialState: {
        reservationList: []
    },

    reducers: {
       addBooking: (state, action) => {
            const newBooking = {
                id: 1,
            }

            state.reservationList.push(newBooking)
       },

       deleteBooking: (state, action) => {
           state.reservationList.filter(booking => booking !== action.payload)
       }
    }
})


export const { addBooking } = reservationSlice.actions


export default reservationSlice.reducer