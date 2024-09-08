import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import connect from './database/conn.js'
import router from './router/route.js'
import bodyParser from 'body-parser'


const app = express()
//Middlewares
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.disable('x-powered-by') //Less hackers know about our stack
app.use(morgan('tiny'))


const port = 8080


//HTTP GET Request
app.get('/', (req, res) =>{
    res.status(201).json("Home Get Request")
})


//API Routes
app.use('/api', router)


//Start Server only when we have a valid connection
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server Connected to port: ${port}`)
        })    
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log('Invalid Connection')
})
