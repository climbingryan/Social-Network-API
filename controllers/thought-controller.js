const { Thought, User } = require('../models');

const thoughtController = {
    // GET ALL
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },
    // GET by Id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Oh no! No thought was found with this id. sry :(' })
                    return;
                }
                res.json(dbThoughtData)
            })
              .catch(err => {
                  console.log(err);
                  res.status(400).json(err);
              });
    },
    // CREATE Thought
    addThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // UPDATE by Id
    updateThoughtById({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then(({ _id }) => {
                return User.findByIdAndUpdate(
                    { id: params.userId },
                    { $push: { thought: _id } },
                    { new: true }
                )
            })
              .then(dbThoughtData => {
                  if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id!' })
                    return;
                  }
                  res.json(dbThoughtData)
              })
              .catch(err => {
                  console.log(err);
                  res.status(400).json(err);
              });
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought with this id. sry :(' })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
}

module.exports = thoughtController;