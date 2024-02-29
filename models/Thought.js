const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction'); 
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Virtual properties for total reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Initialize the Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;