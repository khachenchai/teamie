import mongoose from "mongoose";

const TaskModel = new mongoose.Schema({
    title: String,
    description: String,
    finish_on: Date,
    team_id: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    author_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    is_clear: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', TaskModel);

export default Task;