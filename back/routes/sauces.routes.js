const router = require('express').Router();
const sauceController = require('../controllers/sauces.controller');
const { checkAuth } = require('../middlewares/auth');
const multer = require('../multer');

router.get('/', checkAuth, sauceController.getAllSauces);
router.get('/:id', checkAuth, sauceController.getOneSauce);
router.post('/', checkAuth, multer.upload, sauceController.createSauce);
router.delete('/:id', checkAuth, sauceController.deleteSauce);
router.post('/:id/like', checkAuth, sauceController.likeSauce);
router.put('/:id', checkAuth, multer.upload, sauceController.updateSauce);

module.exports = router;