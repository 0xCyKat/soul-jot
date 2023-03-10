const connectToMongo = require("./db")
connectToMongo(); 

const express = require("express")
const cors = require('cors'); 
const app = express() 

app.use(express.json()); 
app.use(cors()); 

app.use("/auth", require("./routes/auth")) // using router package (expres package)
app.use("/notes", require("./routes/notes"))


app.listen(5000, ()=>{
    console.log("SoulJot backend is listening on port 5000")
})

