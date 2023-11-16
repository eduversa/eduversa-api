require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToServer, clearAllCollections } = require("./config/db.config");
const accountRouter = require("./routes/accounts.routes");
const applicantRouter = require("./routes/applicant.routes");

const app = express();
const port = process.env.PORT;

// const corsOptions = {

// }
app.use(express.json());
// app.use(cors(corsOptions))

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://192.168.0.100:3000",
      "http://192.168.0.101:3000",
      "http://192.168.0.102:3000",
      "https://eduversa.github.io",
    ],
    methods: "GET,POST,PUT,DELETE,PATCH,UPDATE,HEAD",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true,
  })
);

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
        help: ["/account"]
    })
})
//yellow-f// DEFAULT ROUTE END

app.use("/account", accountRouter);
app.use("/applicant", applicantRouter);

connectToServer(app, port);
