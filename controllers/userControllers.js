const { User } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Get user by ID
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('friends')
                .populate('thoughts');
            
            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a user
    async createUser( req, res) { 
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                { _id: req.params.userId},
                { $set: req.body }, 
                { new: true, runValidators: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID!' });
            }

            res.json(user); 
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID!' });
            }
            res.json({message: 'User deleted!'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add a friend
    async addFriend(req, res) { 
        try {
            const user = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true, runValidators: true }
            ).populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID!' });
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a friend
    async deleteFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID!' });
            }
            res.json({message: 'Friend deleted!'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
     }
};