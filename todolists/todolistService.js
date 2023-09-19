import TodolistModel from './todolistModel.js'

class TodolistService {
  async create(todolist, userId) {
    todolist.userId = userId;
    return TodolistModel.create(todolist);
  }

  async getAll(userId) {
    return TodolistModel.find({ userId: userId });
  }

  async update(id, todolist) {
    return TodolistModel.findByIdAndUpdate(id, todolist, { new: true })
  }

  async delete(id) {
    return TodolistModel.findByIdAndDelete(id)
  }

  async createTask(todolistId, task) {
    const todolist = await TodolistModel.findById(todolistId)
    if (!todolist) {
      throw new Error('Todolist not found')
    } else {
      todolist.tasks.push(task)
      return await todolist.save()
    }
  }

  async updateTask(todolistId, taskId, task) {
    const result = await TodolistModel.findOneAndUpdate(
      { '_id': todolistId, 'tasks._id': taskId },
      {
        '$set': {
          'tasks.$.title': task.title,
          'tasks.$.isDone': task.isDone,
        },
      },
      { new: true },
    )
    if (!result) {
      throw new Error('Todolist or Task not found')
    }
    return result
  }

  async deleteTask(todolistId, taskId) {
    return TodolistModel.findOneAndUpdate(
      { '_id': todolistId },
      {
        '$pull': {
          'tasks': { '_id': taskId },
        },
      },
      { new: true },
    )
  }
}

export default new TodolistService()
