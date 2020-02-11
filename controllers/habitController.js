import HabitDataServiceProvider from '../services/database/habitDataServiceProvider'

async function createHabit (req, res, next) {
  try {
    const habitData = {
      ...req.body,
      user_id: req.user._id,
    }

    const habitResponse = await HabitDataServiceProvider.createHabit(habitData)
    const respData = {
      success: true,
      habit_data: habitResponse,
      message: 'Successfully created habit'
    }
    return res.status(201).json(respData)
  } catch (error) {
    next(error)
  }
}

async function updateHabit (req, res, next) {
  try {
    const habitResponse = await HabitDataServiceProvider.updateHabit(req.params.habit_id, req.body)
    const respData = {
      success: true,
      message: 'Successfully updated the habit'
    }
    return res.status(200).json(respData)
  } catch (error) {
    next(error)
  }
}

async function getAllHabits (req, res, next) {
  try {
    const habitResponse = await HabitDataServiceProvider.getAllHabits(req.user._id)
    const respData = {
      success: true,
      habit_data: habitResponse,
      message: 'Successfully fetched the habits'
    }
    return res.status(200).json(respData)
  } catch (error) {
    next(error)
  }
}

async function getSingleHabit (req, res, next) {
  try {
    const habitResponse = await HabitDataServiceProvider.getHabit(req.params.habit_id)
    const respData = {
      success: true,
      habit_data: habitResponse,
      message: 'Successfully fetched the habit'
    }
    return res.status(200).json(respData)
  } catch (error) {
    next(error)
  }
}

async function createHabitLog (req, res, next) {
  try {
    const habitLogData = {
      ...req.body,
      user_id: req.user._id,
    }

    const habitLogResponse = await HabitDataServiceProvider.createHabitLog(habitLogData)
    const respData = {
      success: true,
      habit_log_data: habitLogResponse,
      message: 'Successfully created habit log'
    }
    return res.status(201).json(respData)
  } catch (error) {
    next(error)
  }
}

async function getHabitLogOfADay (req, res, next) {
  try {
    const habitLogResponse = await HabitDataServiceProvider.getHabitLogOfADay(req.user._id, req.query.date)
    const respData = {
      success: true,
      habit_log_data: habitLogResponse,
      message: 'Successfully fetched the habit logs'
    }
    return res.status(200).json(respData)
  } catch (error) {
    next(error)
  }
}

export {
  createHabit,
  updateHabit,
  getAllHabits,
  createHabitLog,
  getHabitLogOfADay,
  getSingleHabit,
}