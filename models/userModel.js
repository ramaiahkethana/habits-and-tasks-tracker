import mongoose from 'mongoose'
const Schema = mongoose.Schema
const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    phone_number: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'HOLD', 'DELETE', 'INACTIVE'],
      default: 'ACTIVE',
    },
    avatar: {
      type: String
    }
  }, {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const userModel = mongoose.model('User', UserSchema, 'users')

export default userModel
