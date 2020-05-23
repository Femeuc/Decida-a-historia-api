const { Router } = require('express');
const router = Router();
const { getPageById, getButtonById, getUserById, getStoryById, getAllStories } = require('../controllers/index.controller');

// router.get('/users', getUsers);
// router.get('/users/:id', getUserById);
// router.post('/users', createUser);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);
router.get('/users/:id', getUserById);
router.get('/story/:id', getStoryById);
router.get('/story', getAllStories);
router.get('/page/:id', getPageById);
router.get('/button/:id', getButtonById);

module.exports = router;