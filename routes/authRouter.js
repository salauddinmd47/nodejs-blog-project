const { signupGetController, signupPostController, loginGetController, loginPostController, logoutController } = require('../controllers/authControllers');
 
const signupValidator = require('../validator/auth/signupValidator')
const loginValidator = require('../validator/auth/loginValidator');
const { isUnAuthenticated } = require('../middleware/authMiddleware');

const router = require('express').Router();



router.get('/signup', isUnAuthenticated,signupGetController)
router.post('/signup',isUnAuthenticated, signupValidator, signupPostController)
router.get('/login',isUnAuthenticated, loginGetController)
router.post('/login',isUnAuthenticated,loginValidator, loginPostController)
router.get('/logout',logoutController)
module.exports = router ;