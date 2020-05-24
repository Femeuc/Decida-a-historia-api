const { Router } = require('express');
const router = Router();
const { 
    getPageById, 
    getAllPages,
    getButtonById, 
    getUserById, 
    getStoryById, 
    getAllStories,
    createStoryInitialPage,
} = require('../controllers/index.controller');

// router.get('/users', getUsers);
// router.get('/users/:id', getUserById);
// router.post('/users', createUser);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

router.get('/users/:id', getUserById);
router.get('/story/:id', getStoryById);
router.get('/story', getAllStories);
router.get('/page/:id', getPageById);
router.get('/page', getAllPages);
router.get('/button/:id', getButtonById);

router.post('/page/add', createStoryInitialPage);

module.exports = router;