const Wheel = require('../models/wheel');

module.exports.goToShow = async (req, res) => {
  const { id } = req.params;
  const wheel = await Wheel.findById(id);
  const showPageUrl = req.originalUrl;
  res.render('wheels/show', { wheel, showPageUrl });
}

module.exports.editWheel = async (req, res) => {
  const { id } = req.params;
  await Wheel.findByIdAndUpdate(id, { ...req.body.wheel });
  const redirectUrl = req.originalUrl.replace('?_method=PUT', '');
  req.flash('success', '편집 완료!');
  res.redirect(redirectUrl);
}

module.exports.deleteWheel = async (req, res) => {
  const { id } = req.params;
  await Wheel.findByIdAndDelete(id);
  const redirectUrl = req.originalUrl.replace(`/${id}?_method=DELETE`, '');
  req.flash('success', '삭제 완료!');
  res.redirect(redirectUrl);
}

module.exports.goToEdit = async (req, res) => {
  const { id } = req.params;
  const wheel = await Wheel.findById(id);
  const editPageUrl = req.originalUrl.replace('/edit', '');
  res.render('wheels/edit', { wheel, editPageUrl });
}

module.exports.goToReserve = async (req, res) => {
  const { id } = req.params;
  const wheel = await Wheel.findById(id);
  res.render("reservation/form", { wheel });
}



