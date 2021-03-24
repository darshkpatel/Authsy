const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { knockService } = require('../services');

const createIP = catchAsync(async (req, res) => {
  const user = await knockService.addIP(req.body.IPAddress, req.params.userId);
  res.status(httpStatus.CREATED).send(user);
});

const getIPs = catchAsync(async (req, res) => {
  const userIPs = await knockService.getUserIPsById(req.params.userId);
  if (!userIPs) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User IP details not found');
  }
  res.send(userIPs);
});

const deleteIP = catchAsync(async (req, res) => {
  await knockService.deleteIPById(req.params.ipId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createIP,
  getIPs,
  deleteIP,
};
