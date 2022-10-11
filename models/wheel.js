const mongoose = require('mongoose');
const { Schema } = mongoose;

const WheelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    enum: ['현대', '기아', '기타 차량', 'BMW', '벤츠', '기타 수입 차량'],
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  owner: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Wheel', WheelSchema);