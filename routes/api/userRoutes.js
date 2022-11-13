const router = require ('express').Router();

const{
    getUsers,           // GET *
    getSingleUser,      // GET by ID
    createUser,         // POST user
    updateUser,         // PUT user
    deleteUser,         // DELETE user
    addFriend,       // POST add a use to a users array
    removeFriend,       // DELETE user from users array
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;