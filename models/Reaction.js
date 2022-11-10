const { Schema, Types } = require('mongoose');
const thoughtSchema = require('./Thought');
const userSchema = require('./User');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            timestamp: true,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

//Use a getter method to format the timestamp on query
const formatTimestamp = produce.get('createdAt');
console.log(formatTimestamp);

module.exports = reactionSchema;