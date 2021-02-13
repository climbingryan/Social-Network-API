const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThoughtById,
    deleteThought
} = require('../../controllers/thought-controller')

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

router 
    .route('/:id')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThought);

module.exports = router;