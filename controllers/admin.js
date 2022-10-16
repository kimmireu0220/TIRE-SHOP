const Reservation = require('../models/reservation');
const Wheel = require('../models/wheel');

module.exports.goToRegisterWheel = (req, res) => {
  res.render('wheels/register');
}

module.exports.registerWheel = async (req, res) => {
  const wheel = new Wheel(req.body.wheel);
  wheel.image = req.file.path;
  await wheel.save();
  res.redirect(`/wheels/${wheel._id}`);
}

module.exports.goToReservationList = async (req, res) => {
  let count = 1;
  const reservations = await Reservation.find({});
  res.render('reservation/list', { reservations, count });
}


