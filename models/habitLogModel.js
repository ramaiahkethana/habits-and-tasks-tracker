import mongoose from 'mongoose'
const Schema = mongoose.Schema
const HabitLogSchema = new Schema(
  {
    habit_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
      index: true,
    },
    date: {
      type: Number,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: [
        'COMPLETED',
        'NOT_COMPLETED',
      ],
      required: true,
      default: 'NOT_COMPLETED',
    },
  }, {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
})

const habitLogModel = mongoose.model('Habits_Log', HabitLogSchema, 'habit_logs')

export default habitLogModel
