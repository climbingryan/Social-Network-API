const { Schema, model } = require('mongoose');
const ThoughtSchema = require('./Thought');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9.!?_-]+@[a-zA-Z-]+(?:\.[a-zA-Z0-9]+)$/
        },
        thoughts: [ThoughtSchema],
        friends: [UserSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;