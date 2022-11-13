const {ObjectId} = require('mongoose').Types;
const {User, Thought, Reaction} = require('../models');

// Function to count a User's friends
const friendCount = async () => {
    User.aggregate().count('usersFriendsCount')
    .then((numberOfFriends) => numberOfFriends);
};

// Function that pulls the populated thoughts and friend data
const userThoughtsAndFriendData = async () => {
    User.aggregate([
        {$match: {_id: ObjectId(userId)}},  //matching by user id
        {$unwind: '$thoughts',},            //Deconstructs an array field from the input documents to output a document for each element.
        {$unwind: '$friends'},              //same as line 14
        {$group: {_id: ObjectId(userId), friendData: '$friends'}}, //group data by userID and friends
        {$sort: {username: 1}},
    ])
};

module.exports = {
    //GET all Users
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            const userObject = {users, friendCount: await friendCount()};
            return res.json(userObject);
    })
    .catch((err) => res.status(500).json(err))
    },

    //GET a single user by ID
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId}) // finding by user input => "params"
        .select('-__v') // <= removing Mongoose version key
        .then((user) => 
            !user //if user not found
            ? res.status(404).json({message: 'We could not match a user with that ID'}) // then print message
            : res.json({user, userThoughtsAndFriendData: userThoughtsAndFriendData(req.params.userId)}) // else display user's username
            )
        .catch((err) => res.status(500).json(err));
    },

    //CREATE new user
    createUser(req, res) {
        User.create(req.body) // by input
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    //PUT Update user 
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user) => 
        !user
            ? res.status(404).json({message: 'Could not locate a user with this ID'})
            : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //DELETE user
    deleteUser(req, res) {
        console.log('i am here')
        User.findOneAndRemove({_id: req.params.userId})
        .then((user) => 
            !user //if user not found
                ? res.status(404).json({message: 'Could not locate a user with this ID'})
                : Thoughts.deleteMany({_id: {$in: user.thoughts} })
                )
                .then(()=> res.json({message: "User and associated thoughts were deleted"}))
                .catch((err) => res.status(500).json(err));
    },

    //POST - Add a new friend
    addFriend(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}) //find friend by their user id
        .then((user) => {
            User.findOneAndUpdate( //update it
                {users: req.params.userId},
                {$addToSet: {friends: ObjectId}}, //adds a value to an array unless the value is already present, 
                {new: true} //as a new friend
            );
        })
        .then((user) =>
            !user
            ? res.status(404).json({message: 'Friend user was not found'}) //print messages
            : res.json('Friend was added to the friends list')
        )
        .catch((err) => {
            res.status(500).json(err);
        })
    },

    // DELETE - Remove a Friend
    removeFriend(req, res) {
        User.findOneAndRemove({_id: req.params.userId}) //find user by id
        .then((user) => {
            !user //if user not found
            ? res.status(404).json({message: 'User with this ID was not found'})
            : User.findOneAndUpdate(  //find user associated with this user
                {users: req.params.userId}, //get info from object parameter
                {$pull: {friends: ObjectId}}, //removes user from an array of users
                {new: true} //Returns the document after update was applied.
            )
        })
        .then((user) => 
            !user //if user not found
            ? res.status(404).json({message: 'User with this ID was not found'})
            : res.json({message: 'Friend was removed from the friends list'})
        )
    }
};
