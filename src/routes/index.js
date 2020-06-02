const { Router } = require('express');
const router = Router();
const { 
    getPageById, 
    getAllPages,
    getPageWhereButtonIs,
    getButtonById,
    getButtonWherePageIs,
    getUserById,
    getUserByUsername,
    getStoryById,
    getAllStories,
    getStoriesByGenre,
    getPageInnerJoinButton1AndButton2,

    createPage,
    createStory,
    createButton,
    createButtonWithRelation,
    createPageAndItsButtons,
    createUser,

    updateStory,
    updateButton

} = require('../controllers/index.controller');

// router.get('/users', getUsers);
// router.get('/users/:id', getUserById);
// router.post('/users', createUser);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

router.get('/users/id/:id', getUserById);
router.get('/users/where', getUserByUsername);
router.get('/story/:id', getStoryById);
router.get('/story', getAllStories);
router.get('/story/genre/:id', getStoriesByGenre);
router.get('/page/:id', getPageById);
router.get('/page', getAllPages);
router.get('/page/button1/:id', getPageWhereButtonIs);
router.get('/button/:id', getButtonById);
router.get('/button/page/:id', getButtonWherePageIs);
router.get('/page/:id/buttons', getPageInnerJoinButton1AndButton2);

router.post('/page/add', createPage);
router.post('/story/add', createStory);
router.post('/button/add', createButton);
router.post('/button/page/add', createButtonWithRelation);
router.post('/page/buttons/add', createPageAndItsButtons);
router.post('/users/add', createUser);

router.put('/story/update/:id', updateStory);
router.put('/button/update/:id', updateButton);

module.exports = router;