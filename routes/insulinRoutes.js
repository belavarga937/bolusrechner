const express = require('express');
const router = express.Router();
const {validationInsulinData} = require('../utils/validation');
const insulinController = require('../controllers/insulinController');
const jwtValidation = require('../middleware/authMiddleware');


router.get('/', insulinController.getSettingsPage);
router.get('/data', jwtValidation, insulinController.getShowingInsulinData);

router.put('/measurements/:meal', jwtValidation, validationInsulinData, insulinController.saveInsulinData);

module.exports = router;