import mongoose, { Schema } from "mongoose";

const TeamModel = new Schema({
    name: String,
    description: String,
    password: String,
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    plans_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Plan'
    }]
})

const Team = mongoose.models.Team || mongoose.model('Team', TeamModel);

export default Team;
