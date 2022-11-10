const {ObjectId} = require('mongoose').types;
const {User, Thought} = require('../models');

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
            const userObject = {users, friendCount: await friendCount()
            };
            return res.json(userObject);
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });

    //GET a single user by ID
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId}) // finding by user input => "params"
        .select('-__v') // <= removing Mongoose version key
        .then((user) => 
            !user //if user not found
            ? res.status(404).json({message: 'We could not match a user with that ID'}) // then print message
            : res.json({user, userThoughtsAndFriendData: await userThoughtsAndFriendData(req.params.userId)}) // else display user's username
            )
        .catch((err) => res.status(500).json(err));
    },

    //CREATE new user
    createUser(req, res) {
        User.create(req.body) // by input
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    //delete user and remove their 







};
