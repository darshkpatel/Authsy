const httpStatus = require('http-status');
const { Knock } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Add a IP
 * @param {string} IPAddress
 * @param {ObjectId} userId
 * @returns {Promise<Knock>}
 */
const addIP = async (IPAddress, userId) => {
  if (await Knock.isIPAdded(IPAddress, userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'IP already added');
  }
  const details = await Knock.create({ IPAddress, userId });
  return details;
};

/**
 * Get user IPs by id
 * @param {ObjectId} userid
 * @returns {Promise<Knock>}
 */
const getUserIPsById = async (userId) => {
  return Knock.find({ userId });
};

/**
 * Delete user IP by id
 * @param {ObjectId} ipId
 * @returns {Promise<Knock>}
 */
const deleteIPById = async (ipId) => {
  const Ip = await Knock.findById(ipId);
  if (!Ip) {
    throw new ApiError(httpStatus.NOT_FOUND, 'IP address not found');
  }
  await Ip.remove();
  return Ip;
};

module.exports = {
  addIP,
  getUserIPsById,
  deleteIPById,
};
