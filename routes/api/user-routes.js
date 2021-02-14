const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    createNewFriend,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller')

// get & post 
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:userId/friends/:friendId')
    .post(createNewFriend);

// GET one, PUT & DELETE 
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;