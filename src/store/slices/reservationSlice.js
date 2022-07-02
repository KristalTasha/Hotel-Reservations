import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

//thunk function which will contain, pending, fulfilled and rejected states
export const fetchBookings = createAsyncThunk('reservations', async () => {
    //const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    const response = await axios.get('http://localhost:9090/reservations')
    return response.data
})

export const addReservation = createAsyncThunk('add/reservation', async ({pname, persons, date}) => {
    const response = await axios.post('http://localhost:9090/book-room',  { pname, persons, date })

    return response.data

})

export const reservationSlice = createSlice({
    name: 'reservations',
    initialState: {
        reservationList: [],
        testList: [],
        loading: false,
        error: ''
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




    },

    extraReducers: builder => {
        builder.addCase(fetchBookings.pending, (state, action ) => {
            state.loading = true
        })
        .addCase(fetchBookings.fulfilled, (state, action) => {
            console.log('---fulfilled state action---', action)
            state.reservationList = action.payload;
            state.loading = false
        })
        .addCase(fetchBookings.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        .addCase(addReservation.pending, (state, action) => {
            state.loading = true
        })
        .addCase(addReservation.fulfilled, (state, action) => {
            state.reservationList = action.payload;
            state.loading = false
        })
        .addCase(addReservation.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }

})


export const { addBooking, delBooking, checkBooking } = reservationSlice.actions


export default reservationSlice.reducer