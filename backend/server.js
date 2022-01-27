const express = require('express')
const cors = require('cors')
const PORT = 8888
const app = express()

app.use(cors())

//load routes
const routes = require('./routes/routes')
app.use('/api',routes)


app.listen(PORT,err=>{
    if(err) throw err
    console.log("Server Started at PORT - 8888")
})