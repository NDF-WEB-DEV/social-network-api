const router = require ('express').Router();

const{
    getThoughts,        // GET *
    getSingleThought,   // GET by ID
    createThought,      // POST Thought
    updateThought,      // UPDATE Thought
    deleteThought,      // DELETE Thought
    createReaction,     // POST Reaction
    removeReaction,     // DELETE Reaction
} = require('../../controllers/thoughtController');

// /api/thoughts/
router.route('/').post(createThought).get(getThoughts);


// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/reactionId').delete(removeReaction);

module.exports = router;