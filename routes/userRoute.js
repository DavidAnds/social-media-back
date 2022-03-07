const express = require('express');
const { route } = require('../app');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl');
const userCtrl = require('../controllers/userCtrl');
const checkAuth = require('../middleware/checkAuth')

router.post('/auth/signin', authCtrl.signIn);
router.post('/auth/signup', authCtrl.signUp);
router.put('/bio/:id', checkAuth, userCtrl.modifyBio )
router.get('/:id', userCtrl.showUser)

module.exports = router;
