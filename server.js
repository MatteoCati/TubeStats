require('dotenv').config()
const express = require('express')
const path = require('path')

app = express()

app.use(express.static(path.join(__dirname, 'frontend', 'build')))

app.use('/api', require('./routes'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log('Server listening on port ' + port)
})
