const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReservationSchema = new Schema({
  wheelName: {
    type: String,
    required: true,
  },
  wheelQuantity: {
    type: Number,
    required: true,
    min: 1,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerID: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Reservation', ReservationSchema);