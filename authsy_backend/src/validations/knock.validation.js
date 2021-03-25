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

const knockPort = {
  body: Joi.object().keys({
    knockPort: Joi.number().min(1).max(65535).required(),
    port: Joi.number().min(1).max(65535).required(),
  }),
};
module.exports = {
  addIP,
  getIPs,
  deleteIP,
  knockPort,
};