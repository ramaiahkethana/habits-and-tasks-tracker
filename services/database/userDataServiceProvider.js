import UserModel from '../../models/userModel'
import bcrypt from 'bcrypt'
const saltRounds = 12

class UserDataServiceProvider {
  async saveUser(userData) {
    // Hash Password
    userData.password = await bcrypt.hash(userData.password, saltRounds)
    return UserModel.create(userData)
  }

  async login(username, password) {
    let match = false
    const userDetails = await UserModel.findOne({ username: username })
    if (userDetails) { match = await bcrypt.compare(password, userDetails.password) }
    return match ? userDetails : null
  }

  async getUserByUsername(username = '') {
    return UserModel.findOne({ username: username })
  }

  async getUserByEmail(email) {
    return UserModel.findOne({ email })
  }

  async updateUserById(_id, userData) {
    return UserModel.updateOne({ _id }, { $set: userData }, { new: true })
  }

  async deleteUserById(userId) {
    return UserModel.deleteOne({ _id: userId })
  }

  async updateUserPasswordById(userId, password) {
    const updatedPassword = await bcrypt.hash(password, saltRounds)
    return UserModel.updateOne({ _id: userId }, { $set: { password: updatedPassword } })
  }

  async updateUserProfilePicById(userId, profilePicPath) {
    return await UserModel.updateOne({ '_id': userId }, { $set: { avatar: profilePicPath } })
  }

  async checkCurrentPassword(userId, password) {
    let user = await UserModel.findOne({ _id: userId })

    return await bcrypt.compare(password, user.password)
  }
}

export default new UserDataServiceProvider()
