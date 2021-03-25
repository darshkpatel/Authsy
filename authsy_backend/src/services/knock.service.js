const httpStatus = require('http-status');
const util = require('util');
// eslint-disable-next-line security/detect-child-process
const exec = util.promisify(require('child_process').exec);
const publicIp = require('public-ip');
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

/**
 * Port knocking
 * @param {Object} knockdetails
 * @param {ObjectId} ipId
 * @returns {Promise<Knock>}
 */
const knockport = async (knockdetails, ipId) => {
  const { port, knockPort } = knockdetails;
  const serverIP = await Knock.findById(ipId);
  if (!serverIP) {
    throw new ApiError(httpStatus.NOT_FOUND, 'IP address not found');
  }
  const details = {};
  details.IP = await publicIp.v4();
  const { stdout, stderr } = await exec(`./knock.sh ${serverIP.IPAddress} ${port} ${details.IP} ${knockPort}`);
  if (stderr) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Port Knocking Failed');
  }
  // eslint-disable-next-line prefer-destructuring
  details.STATUS = stdout.split('\n')[0].replace(/\s+/g, '').split(':')[1];
  if (details.STATUS === 'true') {
    // eslint-disable-next-line prefer-destructuring
    details.FORWARDING_PORT = stdout.split('\n')[1].replace(/\s+/g, '').split(':')[1];
  }
  return details;
};

module.exports = {
  addIP,
  getUserIPsById,
  deleteIPById,
  knockport,
};
