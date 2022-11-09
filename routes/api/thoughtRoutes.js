const router = require ('express').Router();

const{
    getThoughts,        // GET *
    getSingleThought,   // GET by ID
    createThought,      // POST Thought
    updateThought,      // UPDATE Thought
    deleteThought,      // DELETE Thought
    createReaction,     // POST Reaction
    deleteReaction,     // DELETE Reaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reaction
router.route('/:thoughtId/reaction').post(createReaction);

// /api/thoughts/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;