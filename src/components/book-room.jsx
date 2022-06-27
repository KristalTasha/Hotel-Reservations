import axios from 'axios'
import React, { useState } from 'react'
import './styles/book-room.scss'

export default function BookRoom() {

  const [ pname, setName ] = useState('')
  const [ persons, setPersons ] = useState('')
  const [ date, setDate ] = useState('')


  const bookRoom = async (e) => {
    try{
      e.preventDefault()

      const response = await axios.post('http://localhost:9090/book-room', {
        pname,
        persons,
        date
      })

      const { data } = response;
      console.log('post data ---', data)

      setName('')
      setPersons('')
      setDate('')

    } catch(error){
      console.log(error)
    }
  }


  return (
    <div className='form-cont'>
        <h3 className='book-title'>Book a Room</h3>
        <form>
            <div>
            <label for='name'>Name</label>
            <input type='text' id='name' onChange={(e) => setName(e.target.value)} value={pname} placeholder='Name'/>
            </div>

            <div>
            <label for='persons'>Number of persons</label>
            <input type='number' id='persons' onChange={(e) => setPersons(e.target.value)} value={persons} placeholder='Number of persons'/>
            </div>

            <div>
            <label for='date'>Date</label>
            <input type='date' id='date' onChange={(e) => setDate(e.target.value)} value={date} placeholder='Date'/>
            </div>

            <button type='submit' onClick={bookRoom}>Submit</button>
        </form>
    </div>
  )
}
