const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

//Usando template engine
server.set('view engine', 'ejs')

//Difinir local do path
server.set('views', path.join(__dirname, 'views'))
//public
server.use(express.static("public"))

//Utilizar o req.body
server.use(express.urlencoded({ extended: true }))

//routes
server.use(routes)

server.listen(3000, () => console.log('serverON...'))