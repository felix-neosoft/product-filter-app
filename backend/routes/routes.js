const express = require('express')
const Router = express.Router()
const fs = require('fs')

Router.get('/fetchuser',(req,res)=>{
    fs.readFile('./data/user.json',(err,data)=>{
        if(err) { res.send('404! Server not working correctly')}
        res.send(JSON.parse(data))
    })
})

Router.get('/products',(req,res)=>{
    fs.readFile('./data/products.json',(err,data)=>{
        if(err) { res.send('404! Server not working correctly')}
        res.send(JSON.parse(data))
    })
})

Router.post('/registeruser',(req,res)=>{
    var body = ''
    req.on('data',data=>{
        body+=data
    })
    req.on('end',err=>{
        fs.readFile('./data/user.json','utf-8',(err,data)=>{
            if(err){ res.send('404! Server not working correctly') }
            var user = JSON.parse(data)
            body = JSON.parse(body)
            var id = user.length + 1 
            var form = {"id":id,"name":body.name,"username":body.username,"email":body.email,"password":body.password}
            user.push(form)
            fs.writeFileSync('./data/user.json',JSON.stringify(user))
            res.send('Registered Successfully')
        })
    })
})


module.exports = Router