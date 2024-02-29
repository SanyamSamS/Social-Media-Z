const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Get thought by ID
    async getThoughtById({ params }, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .populate('reactions');
            
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a thought
    async createThought( req, res) { 
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThought({ params, body }, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId},
                { $set: req.body }, 
                { new: true, runValidators: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID!' });
            }

            res.json(thought); 
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a thought
    async deleteThought({ params }, res) {
        try {
            const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID!' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            res.json({message: 'Thought deleted!'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add a reaction
    async addReaction({ params, body }, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: body } },
                { new: true, runValidators: true}
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a reaction
    async deleteReaction({ params }, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID!' });
            }

            res.json({message: 'Reaction deleted!'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};