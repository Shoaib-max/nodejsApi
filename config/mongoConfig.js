const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/api")
.then(()=>console.log("mongo connection started"))
.catch((err)=> console.log(err));

module.exports = mongoose