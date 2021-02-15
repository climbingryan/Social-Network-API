const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    createReaction,
    updateThoughtById,
    deleteThought,
    deleteReaction
} = require('../../controllers/thought-controller')

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction);    

router 
    .route('/:id')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThought);

module.exports = router;