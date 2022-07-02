import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { delBooking, checkBooking, fetchBookings } from '../store/slices/reservationSlice'
import { useSelector, useDispatch } from 'react-redux'
import './styles/reservations.scss'

export default function Reservations() {

 const dispatch = useDispatch();


  const [bookingList, setBookingList] = useState([])
  const [loading, setLoading] = useState(false)

  const allBookings = useSelector((state) => state.reservations.reservationList )
  console.log('state from toolkit', allBookings)

  const bookings = async () => {
    try {

      dispatch(fetchBookings())

       //from redux
       setBookingList(allBookings)

      console.log('before', bookingList)

      // setLoading(true)

      // const response = await axios.get('http://localhost:9090/reservations')

      // const { data } = response

      // setLoading(false)

      //from api
      // setBookingList(data)

     

      // console.log('after', bookingList)


      // if(data){
      //   setBookingList(data)
      //   console.log('bookingList', bookingList)
      
      // }

    } catch (error) {
      console.log('get error---', error)
    }
  }

  useEffect(() => {
    bookings()
  }, [allBookings])


  const deleteBooking = async (id) => {
    try{

      dispatch(delBooking(id))
      setBookingList(allBookings)

      const response = await axios.delete(`http://localhost:9090/delete/${id}`)

      const { data } = response

      // if(data){
      //   // setBookingList(data)
      // }

      
    } catch(error){
      console.log(error)
    }
  }


  const checkInToggle = async (id) => {
    try{

   
      dispatch(checkBooking(id))
      setBookingList(allBookings)

       const response = await axios.put(`http://localhost:9090/checked/${id}`)

       const { data } = response

      //  if(data){
      //    setBookingList(data)
      //  }

    } catch(error){
      console.log('update error---', error)
    }
  } 



  if (bookingList.length > 0) {

    return (
      <div className='bookings-cont'>
        <h3>Reservations</h3>
        <div className='bookings-grid'>

          {bookingList.map((booking) => (

              // {console.log('one booking',booking)}

            <div className='booking' key={booking.id}>
                <div className='details'>
                <p>Name: <span>{booking.name}</span></p>
                <p>People: <span>{booking.persons}</span></p>
                <p>Room: <span>{booking.room}</span></p>
                <p>Date: <span>{booking.date}</span></p>
                </div>
                <div className='buttons-cont'>

                  { booking.checkedIn === false ? 
                  
                  <button className='checked' style={{backgroundColor: 'grey'}} onClick={() => checkInToggle(booking.id)}>Checked Out</button>

                  :

                  <button className='checked' style={{backgroundColor: 'green'}} onClick={() => checkInToggle(booking.id)}>Checked In</button>
                }

                  
                  <button className='delete' onClick={() => deleteBooking(booking.id)}>X</button>
                </div>
            </div>

          ))}


        </div>
      </div>
    )

  } else {
    return (
      <div className='bookings-cont'>
      <h3>Reservations</h3>
        <p>No reservations yet</p>
    </div>
    )

  
  }


}
