const User = require('../models/user');
const Reservation = require('../models/reservation');

module.exports.index = async (req, res) => {
  let count = 1;
  const reservations = await Reservation.find({});
  res.render('reservation/list', { reservations, count });
}

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(req.user._id, { $pull: { reservations: id } });
  await Reservation.findByIdAndDelete(id);
  res.redirect('/reservations');
}