const router = require('express').Router();
const userController = require('../controllers/users.controller');
const {validateEmail}= require('../middlewares/email');

router.post('/signup', validateEmail, userController.postUser);
router.post('/login', userController.loginUser);


module.exports = router;