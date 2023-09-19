import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isDone: { type: Boolean, required: true }
});

const Model = new mongoose.Schema({
  title: { type: String, required: true },
  tasks: [TaskSchema],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Todolist', Model);
