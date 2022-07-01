import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export const reservationSlice = createSlice({
    name: 'reservations',
    initialState: {
        reservationList: []
    },

    reducers: {
        addBooking: (state, action) => {
            console.log('action', action);



            const newBooking = {
                id: uuidv4(),
                name: action.payload.pname,
                persons: action.payload.persons,
                room: `${action.payload.persons} in guest suite`,
                date: action.payload.date,
                checkedIn: false
            }

            state.reservationList.push(newBooking)
        },

        delBooking: (state, action) => {
            state.reservationList = state.reservationList.filter(booking => booking.id !== action.payload)
        },

        checkBooking: (state, action) => {
            let theBooking = state.reservationList.find(booking => booking.id === action.payload)
            theBooking.checkedIn = !theBooking.checkedIn


        }




    }
})


export const { addBooking, delBooking, checkBooking } = reservationSlice.actions


export default reservationSlice.reducer