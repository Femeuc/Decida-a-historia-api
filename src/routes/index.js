const { Router } = require('express');
const router = Router();
const { getMessage } = require('../controllers/index.controller');

// router.get('/users', getUsers);
// router.get('/users/:id', getUserById);
// router.post('/users', createUser);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);
router.get('/', getMessage );

module.exports = router;