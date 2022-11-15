const {ObjectId} = require('mongoose').Types;
const {User, Reaction, Thought} = require('../models');

module.exports = {

    //GET all thoughts
    getThoughts(req, res) {
        Thought.find() //find all thoughts
        .then((thoughts) => res.json(thoughts)) //List them
        .catch((err) => res.status(500).json(err));
    },

    //GET single Thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId}) // find a thought by id
        .then((thought) => 
            !thought // if not found
            ? res.status(404).json({message: 'We did not find a thought with this ID'}) //print message
            : res.json(thought) // else display the thought
        )
        .catch((err) => res.status(500).json(err));
    },

    //POST Create a new thought + Push the new thought ID to the associated user's thought array field
    createThought(req, res) {
        Thought.create(req.body)
        .then((thoughts) => res.json(thoughts))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
    },

    // createThought(req, res) {
    //     Thought.create(req.body) //Thought object
    //     .then((thought) => {
    //         return User.findOneAndUpdate( //find the user
    //             {thoughts: req.body.thoughtText}, //access input for thought content
    //             {username: req.body.username}, //access input for user name
    //             {_id: req.body.User._id},  //access input for ID
    //             {$push: {thoughts: thought._id}}, //Push the new thought ID to the associated user's thought array field
    //             {new: true} //as a new thought
    //         );
    //     })
    //     .then((user) =>
    //         !user // if user not found
    //         ? res.status(404).json({message: 'Thought created, but associated user id was not found'})  // print message
    //         : res.json('Thought was created') 
    //     )
    //     .catch((err) => {
    //         res.status(500).json(err);
    //     });
    // },

    //PUT Update thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate( 
            {_id: req.params.thoughtId}, //find it by id
            {$set: req.body}, //modify it
            {runValidators: true, new: true} //run vlaidaotr
        )
        .then((thought) => 
        !thought
            ? res.status(404).json({message: 'A thought with this ID was not found'})
            : res.json(thought)
        )
        .catch((err) =>{
            res.status(500).json(err);
        });
    },

    //DELETE thought by ID and remove them from the user's thoughts
    deleteThought(req, res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId}) 
        .then((thought) => 
            !thought  //If thought not found
                ? res.status(404).json({message: 'A thought with this ID was not found'}) //then print message
                : User.findOneAndUpdate(  //find user associated with this Thought
                    {users: req.params.userId}, //get info from object parameter
                    {$pull: {users: req.params.userId}}, //removes user from an array of users
                    {new: true} //Returns the document after update was applied.
                )
        )
        .then((user) => 
            !user
            ? res.status(404).json({message: 'No associated user id found with this thought'})
            : res.json({message: 'Thought was deleted'})
        )
        .catch((err) => res.status(500).json(err));        
    },

    // POST to create a reaction stored in a single thought's reactions array field
    createReaction(req, res) {
        console.log('Adding a reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
            {_id: req.params._id},
            {$addToSet: {reactions: req.body}}, //adds a value to an array unless the value is already present, 
            {new: true}
        )
        .then((thought) => 
            !thought
            ? res.status(404).json({message: 'No thought found with this ID'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    //DELETE to pull and remove a reaction by the reaction's reactionId value
    removeReaction(req, res) {
        Thought.findOneAndUpdate( //find thought to remove reaction from
            {_id: req.params._id}, //enter thoughts id
            {$pull: {reactions: {reactionId: req.params.reactionId}}}, // remove the reaction 
            {runValidators: true, new: true}
        )
        .then((thought) => 
            !video
                ? res.status(404).json({message: 'No thought found with this ID'})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
} //end of clause