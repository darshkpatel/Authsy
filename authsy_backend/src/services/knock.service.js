const httpStatus = require('http-status');
const util = require('util');
// eslint-disable-next-line security/detect-child-process
const exec = util.promisify(require('child_process').exec);
const { Knock } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Add a IP
 * @param {string} IPAddress
 * @param {number} port
 * @param {ObjectId} userId
 * @returns {Promise<Knock>}
 */
const addIP = async (IPAddress, port, userId) => {
  if (await Knock.isIPAdded(IPAddress, userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'IP already added');
  }
  const details = await Knock.create({ IPAddress, port, userId });
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
  details.IP = knockdetails.clientIP;
  const { stdout, stderr } = await exec(`./knock.sh ${serverIP.IPAddress} ${port} ${details.IP} ${knockPort}`);
  if (stderr) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Port Knocking Failed');
  }
  // eslint-disable-next-line prefer-destructuring
  details.STATUS = stdout.split('\n')[0].replace(/\s+/g, '').split(':')[1];
  if (details.STATUS === 'true') {
    // eslint-disable-next-line prefer-destructuring
    details.FORWARDING_PORT = stdout.split('\n')[1].replace(/\s+/g, '').split(':')[1];
    await exec(`ufw allow from ${details.IP} to any port ${details.FORWARDING_PORT}`);
  }
  return details;
};

module.exports = {
  addIP,
  getUserIPsById,
  deleteIPById,
  knockport,
};
