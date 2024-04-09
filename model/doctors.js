const mongoose = require("mongoose");


const DoctorSchema = new mongoose.Schema({
    name  :String,
    docId : String

})

const Doctor = mongoose.model("doctor",DoctorSchema);

module.exports = Doctor;