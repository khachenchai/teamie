import mongoose from "mongoose";

const PlanModel = new mongoose.Schema({
    title: String,
    description: String,
    tasks_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    team_id: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }
})

const Plan = mongoose.model('Plan', PlanModel);

export default Plan;