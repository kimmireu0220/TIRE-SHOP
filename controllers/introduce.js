const Wheel = require('../models/wheel');

module.exports.recommend = async (req, res) => {
  req.session.returnTo = req.originalUrl;
  const hyundaiWheels = await Wheel.find({ category: '현대' });
  const kiaWheels = await Wheel.find({ category: '기아' });
  const othersWheels = await Wheel.find({ category: '기타 차량' });
  const bmwWheels = await Wheel.find({ category: 'BMW' });
  const benzWheels = await Wheel.find({ category: '벤츠' });
  const importedothersWheels = await Wheel.find({ category: '기타 수입 차량' });
  res.render('introduce/recommend', { hyundaiWheels, kiaWheels, othersWheels, bmwWheels, benzWheels, importedothersWheels });
}

module.exports.greeting = (req, res) => {
  req.session.returnTo = req.originalUrl;
  res.render('introduce/greeting');
}

module.exports.show = (req, res) => {
  req.session.returnTo = req.originalUrl;
  res.render('introduce/show');
}

module.exports.direction = (req, res) => {
  req.session.returnTo = req.originalUrl;
  res.render('introduce/direction');
}


