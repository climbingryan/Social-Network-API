const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller')

// get & post 
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// GET one, PUT & DELETE 
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;