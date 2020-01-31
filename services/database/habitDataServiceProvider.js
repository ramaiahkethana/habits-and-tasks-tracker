import HabitModel from '../../models/habitModel'
import HabitLogModel from '../../models/habitLogModel'

class HabitServiceProvider {
  async createHabit(habitData) {
    return HabitModel.create(habitData)
  }

  async updateHabit(habit_id, habitData) {
    return HabitModel.updateOne({
      habit_id,
    }, {
      $set: habitData,
    })
  }

  async getAllHabits(user_id) {
    return HabitModel.find({ user_id })
  }

  /* need to change as per utc time */
  async insertHabitLogOfADay(habitLog) {
    return HabitLogModel.insert(habitLog)
  }

  /* need to change as per utc time */
  async getHabitLogOfADay(user_id, date) {
    return HabitLogModel.find({
      user_id,
      date,
    })
  }
}

export default new HabitServiceProvider()
