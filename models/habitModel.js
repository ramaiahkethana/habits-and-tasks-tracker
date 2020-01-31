import mongoose from 'mongoose'
const Schema = mongoose.Schema
const HabitSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
      index: true,
    },
    frequency: {
      type: String,
      enum: [
        'DAILY',
        'WEEKLY',
        'MONTHLY',
      ],
      required: true,
      default: 'DAILY',
    },
  }, {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const habitModel = mongoose.model('Habit', HabitSchema, 'habits')

export default habitModel
