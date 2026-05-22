const express = require("express")
const {Server} = require("socket.io")
const http = require('http')
 const app = express()

const server = http.createServer(app)
const io = new Server(server)
app.set("view engine","ejs")


app.get("/",(req,res)=>{
    return res.render("index")
})

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


io.on("connection",(socket)=>{
    console.log("user id --- >",socket.id)

    socket.on("send",(msg)=>{
        console.log(msg)
    })
})

module.exports = server