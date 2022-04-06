const router = require('express').Router();
const { dashboardGetController } = require('../controllers/dashboardController');
const { isAuthenticate } = require('../middleware/authMiddleware');


router.get('/', isAuthenticate,dashboardGetController)
module.exports= router;