require("dotenv").config()
const express = require("express")
const cors = require("cors")
const {connectToServer, clearAllCollections} = require("./config/db.config")
const accountRouter = require("./routes/accounts.routes")

const app = express()
const port = process.env.PORT;

const corsOptions = {

}
app.use(express.json()) 
app.use(cors(corsOptions))

//yellow-f// DEFAULT ROUTE START
app.get("/connection", async (req, res)=>{
    res.send("API is working")
})
app.delete("/connection/reset", async (req, res)=>{
    clearAllCollections()
})
app.get("/", (req, res)=>{
    res.send({
        status: "working",
        help: []
    })
})
//yellow-f// DEFAULT ROUTE END

app.use("/account", accountRouter)




connectToServer(app, port);