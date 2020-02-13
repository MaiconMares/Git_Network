const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema({
    github_username: {
        type: String,
        required: true,
    },
    description: {
        type: String, 
        required: false,
    },
    avatar_url: {
        type: String,
        required: true,
    },
    techs: {
        type: [String],
        required: false,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    profile_url: {
        type: String,
        required: true,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

UserSchema.plugin(mongoosePaginate);
mongoose.model('User', UserSchema);