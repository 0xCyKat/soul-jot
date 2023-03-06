const connectToMongo = require("./db")
connectToMongo(); 

const express = require("express")
const app = express() 

app.use(express.json()); 

app.use("/auth", require("./routes/auth"))
// app.use("/notes", require("./routes/notes"))


app.listen(5000, ()=>{
    console.log("app is listening on port 5000")
})

