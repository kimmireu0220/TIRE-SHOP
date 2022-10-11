const Wheel = require('../models/wheel');

module.exports.index = (req, res) => {
  res.render('wheels/register');
}

module.exports.wheel = async (req, res) => {
  const wheel = new Wheel(req.body.wheel);
  await wheel.save();
  res.redirect(`/wheels/${wheel._id}`);
}