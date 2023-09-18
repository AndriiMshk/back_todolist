import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isDone: { type: Boolean, required: true },
})

const Model = new mongoose.Schema({
  title: { type: String, required: true },
  tasks: [TaskSchema],
})

export default mongoose.model('Todolist', Model)
