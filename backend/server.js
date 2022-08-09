require('dotenv').config()
const express = require('express')

app = express()

app.use('/api', require('./routes'))

app.listen(process.env.PORT || 4000, () => {
    console.log('Server listening on port ' + (process.env.PORT || 8080))
})
