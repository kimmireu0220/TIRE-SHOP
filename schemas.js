const Joi = require('joi');

module.exports.wheelSchema = Joi.object({
  wheel: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(0),
    // image: Joi.string().required(),
    category: Joi.string().required(),
    quantity: Joi.number().required().min(0),
    owner: Joi.string().required(),
  }).required()
});

module.exports.reservationSchema = Joi.object({
  reservation: Joi.object({
    wheelName: Joi.string().required(),
    wheelQuantity: Joi.number().required().min(1),
    customerName: Joi.string().required(),
    customerID: Joi.string().required(),
  }).required()
});