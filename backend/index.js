const connectToMongo = require("./db")
connectToMongo(); 

const express = require("express")
const app = express() 

app.get("/", (req,res)=>{

    res.write("server is up and running")
    res.send()
})

app.listen(3000, ()=>{
    console.log("app is listening on port 3000")
})

