const express = require('express');
const { auth } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const knockValidation = require('../../validations/knock.validation');
const knockController = require('../../controllers/knock.controller');

const router = express.Router();

router
  .route('/:userId')
  .post(auth('getUsers'), validate(knockValidation.addIP), knockController.createIP)
  .get(auth('getUsers'), validate(knockValidation.getIPs), knockController.getIPs);

router.route('/:ipId').delete(auth('getUsers'), validate(knockValidation.deleteIP), knockController.deleteIP);

module.exports = router;
