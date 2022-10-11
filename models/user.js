const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reservation'
    }
  ]
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);