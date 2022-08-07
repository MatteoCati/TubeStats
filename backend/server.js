require('dotenv').config()
const express = require('express')

app = express()

const cors = require('cors')
const corsOpts = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type'],
}
app.use(cors(corsOpts))

app.use('/api', require('./routes'))

app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening on port ' + (process.env.PORT || 8080))
})
