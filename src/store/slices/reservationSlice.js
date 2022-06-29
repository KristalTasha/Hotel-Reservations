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
       } 
    }
})


export const { addBooking } = reservationSlice.actions


export default reservationSlice.reducer