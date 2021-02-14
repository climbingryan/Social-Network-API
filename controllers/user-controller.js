const { User } = require('../models');

const userController = {

    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v -thoughtText -username -createdAt'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));  
    },

    createNewFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId  } },
            { new: true }
        )
        .then(dbData => res.json(dbData))
        .catch(err => res.json(err));
    },

    updateUser({params, body}, res) {
        console.log(params);
        console.log('==========');
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Sorry, no user found with this id :(' })
                    return;
                }
                res.json(dbUserData);
            })
              .catch(err => res.status(400).json(err));
    },
    
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id, sry :(' })
                    return;
                }
                res.json(dbUserData);
            })
              .catch(err => res.status(400).json(err));
    }

}

module.exports = userController;