const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const crypto = require("crypto")
const nodeMailer = require("nodemailer")

const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const jwt = require("jsonwebtoken")

mongoose.connect("mongodb+srv://meoem2712:2712000Nn@cluster0.cmentol.mongodb.net/").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connect MongoDB");
})


app.listen(port, () => {
    console.log("Server is runing port " + port);
})