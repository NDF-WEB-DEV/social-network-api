const { Schema, model } = require('mongoose');
const Thought = require('./Thought');
const reactionSchema = require('./Reaction');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // validate: {
            //     validator: () => Promise.resolve(false),
            //     message: 'Email validation failed'
            // },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        thoughtSchema: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ], 
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        reactionSchema: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// create a virtual friend count
// that retrieves the lenght of the user's freinds array feild on query.
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;