const router = require('express').Router();
const { 
    getUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    addFriend, 
    deleteFriend 
} = require('../../controllers/userControllers');

// /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/friends/:friendId')
    .delete(deleteFriend)
    .post(addFriend);

module.exports = router;
