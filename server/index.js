const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); //req.body
app.listen(5000,()=>{
    console.log("app runnig")
});