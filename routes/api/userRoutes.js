const router = require ('express').Router();

const{
    getUsers,           // GET *
    getSingleUser,      // GET by ID
    createUser,         // POST user
    updateUser,         // PUT user
    deleteUser,         // DELETE user
    // addThought,         // POST thought
    // removeThought,      // DELETE thought
    addNewFriend,       // POST add a use to a users array
    removeFriend,       // DELETE user from users array
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
router.route('/userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/user/:userId/thoughts
// router.route('/userId/thoughts').post(addThought);

// /api/user/:userId/thoughts/:thoughtId
// router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

// /api/user/:userId/addFriend/:userId
router.route('/user/:userId/addFriend/:userId').post(addNewFriend);

// /api/user/:userId/removeFriend/:userId
router.route('/user/:userId/addFriend/:userId').post(removeFriend);

module.exports = router;