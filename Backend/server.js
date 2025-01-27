const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')

const {errorHandler} = require('./middleware/errorMiddleware')
connectDB()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).json({ message: 'This is a test' }) 
})

app.use('/api/users', require('./routes/userRoute'))
app.use('/api/categories', require('./routes/categoryRoute'));
app.use('/api/categories', require('./routes/subCategoryRoute')); 
app.use('/api/categories', require('./routes/itemRoutes')); 


app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port number: ${PORT}`)) 