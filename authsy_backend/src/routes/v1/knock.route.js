const express = require('express');
const { auth } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const knockValidation = require('../../validations/knock.validation');
const knockController = require('../../controllers/knock.controller');

const router = express.Router();

router
  .route('/:userId')
  .post(auth('2FA'), validate(knockValidation.addIP), knockController.createIP)
  .get(auth('2FA'), validate(knockValidation.getIPs), knockController.getIPs);

router
  .route('/ip/:ipId')
  .delete(auth('2FA'), validate(knockValidation.deleteIP), knockController.deleteIP)
  .post(auth('2FA'), validate(knockValidation.knockPort), knockController.portknock);

module.exports = router;
