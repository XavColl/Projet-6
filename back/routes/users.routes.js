const router = require('express').Router();
const userController = require('../controllers/users.controller');

router.post('/signup', userController.postUser);
router.post('/login', userController.loginUser);


module.exports = router;