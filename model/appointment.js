const mongoose = require("mongoose");


const appointmentSchema = new mongoose.Schema({
    refId  :String,
    BookedOn : String,
    TimeSlot : String

})

const appointment = mongoose.model("appointments",appointmentSchema);

module.exports = appointment;