const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postCtrl');
const likeCtrl = require('../controllers/likeCtrl');
const checkAuth = require('../middleware/checkAuth');

// CRUD 
router.get('/', checkAuth, postCtrl.showAllPost);
router.get('/:id', checkAuth, postCtrl.showPost);
router.post('/create', checkAuth, postCtrl.createPost);
router.put('/modify/:id', checkAuth, postCtrl.modifyPost);
router.delete('/delete/:id', checkAuth, postCtrl.deletePost);

// Like
router.put('/like/:id', checkAuth, likeCtrl.likePost)
router.put('/dislike/:id', checkAuth, likeCtrl.dislikePost)

module.exports = router;
