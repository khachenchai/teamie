import mongoose, { Schema } from "mongoose";

const UserModel = new Schema({
    name: {
        prefix: {
            type: String,
            required: [true, 'Please enter a prefix']
        },
        firstname: {
            type: String,
            required: [true, 'Please enter a firstname']
        },
        lastname: {
            type: String,
            required: [true, 'Please enter a lastname']
        }
    },
    email: {
        type: String,
        required: [true, 'Please enter a email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    owner_teams: {
        type: [{
            type: Schema.Types.ObjectId, ref: 'Team',
        }],
        required: false
    },
    all_teams: {
        type: [{
            type: Schema.Types.ObjectId, ref: 'Team',
        }],
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.models.User || mongoose.model('User', UserModel);

export default User;