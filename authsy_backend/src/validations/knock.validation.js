const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addIP = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    IPAddress: Joi.string().required(),
  }),
};

const getIPs = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const deleteIP = {
  params: Joi.object().keys({
    ipId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  addIP,
  getIPs,
  deleteIP,
};
