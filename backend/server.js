require('dotenv').config()
const express = require('express')
const axios = require('axios').default

app = express()

app.use('/api', require('./routes'))

app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening on port ' + (process.env.PORT || 8080))
})
