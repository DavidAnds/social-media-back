const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl');
const userCtrl = require('../controllers/userCtrl');
const checkAuth = require('../middleware/checkAuth')

router.post('/auth/signin', authCtrl.signIn);
router.post('/auth/signup', authCtrl.signUp);
router.put('/bio/:id', checkAuth, userCtrl.modifyBio )
router.delete('/delete/:id', checkAuth, userCtrl.deleteUser )
router.get('/:id', userCtrl.showUser)
router.get('/', userCtrl.showAllUser)

module.exports = router;
