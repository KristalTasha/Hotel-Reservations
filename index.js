const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const PORT = 9090;

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE'
}));


let reservations = []

app.get('/reservations', async (req, res) => {

    if(reservations.length > 0){
      await res.status(200).json(reservations)
    } 
})

app.post('/book-room', async (req, res) => {
   const {
        pname,
        persons,
        date
    } = req.body

    if(req.body){
        
        const roomType = (people) => {
            if(people < 5){
                return `${people} in 1 suite`
            } else if(people >= 5){
                return `${people} in family challet`
            }
        }

        const newReserv = {
            id: uuidv4(),
            name: pname,
            persons: persons,
            room: roomType(persons),
            date: date,
            checkedIn: false
        }

        reservations.push(newReserv)
        await res.status(200).json(reservations)
        console.log('reservations', reservations)
    } else{
        res.status(400).json({
            message: 'Input text please'
        })
    }

    
})

app.delete('/delete/:id', (req, res) => {
    try{
        const { id } = req.params;

        reservations = reservations.filter(theItem => theItem.id !== id)
    
        res.status(200).json(reservations)
        console.log('remainder', reservations)
    } catch(error){
        console.log('delete error ---', error)
    }

    
})

app.put('/checked/:id', (req, res) => {

    try{
        const { id } = req.params

        const match = reservations.find(item => item.id === id)
    
        match.checkedIn = !match.checkedIn
    
        res.status(200).json(reservations)
        console.log('updated reservation', match)
    } catch(error){
        console.log(error)
    }
   

})




app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))