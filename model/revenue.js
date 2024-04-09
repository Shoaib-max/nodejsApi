const mongoose = require("mongoose");


const revenueSchema = new mongoose.Schema({
    month  :String,
    revenue : Number

})

const revenue = mongoose.model("revenue",revenueSchema);

module.exports = revenue;