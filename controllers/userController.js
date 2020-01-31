import UserDataServiceProvider from '../services/database/userDataServiceProvider'
import config from './../config/app'
import jwt from 'jsonwebtoken'
import utils from '../helpers/utils'
import userDataServiceProvider from '../services/database/userDataServiceProvider'
import md5 from 'md5'


async function signIn (req, res, next) {
  try {
    const { username, password } = req.body
    const user = await UserDataServiceProvider.login(username, password)
    req.user = user
    if (user) {
      const user = {
        id: req.user._id,
        username: req.user.username,
        phone_number: req.user.phone_number,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        status: req.user.status,
      }

      const tokenSecret = config.jwt.token_secret + req.user.password
      const refreshTokenSecret = config.jwt.refresh_token_secret + req.user.password

      const token = jwt.sign(user, tokenSecret, {
        expiresIn: config.jwt.token_life
      })

      const refreshToken = jwt.sign(user, refreshTokenSecret, {
        expiresIn: config.jwt.refresh_token_life
      })

      if (req.user.password) {
        delete req.user.password
      }

      const respData = {
        success: true,
        user_details: req.user,
        access_token: token,
        refresh_token: refreshToken,
        message: 'User Login Success!'
      }

      return res.status(201).json(respData)
    } else {
      const respData = {
        success: false,
        message: 'Invalid Credentials!'
      }
      return res.status(401).json(respData)
    }
  } catch (error) {
    // TO DO
    next(error)
  }
}

async function register (req, res, next) {
  try {
    const user = await UserDataServiceProvider.saveUser(req.body)

    // we need to remove user password form data
    if (user.password) delete user.password

    const respData = {
      success: true,
      message: 'User created successfully',
      user
    }
    return res.status(201).json(respData)
  } catch (err) {
    next(err)
  }
}

async function profile (req, res, next) {
  try {
    const respData = {
      success: true,
      message: 'User profile data fetched successfully',
      user_details: req.user
    }
    return res.status(200).json(respData)
  } catch (error) {
    next(error)
  }
}

// update profile data
async function updateProfile (req, res, next) {
  try {
    const profileData = req.body
    const updatedUserData = await UserDataServiceProvider.updateUserById(req.user._id, profileData)
    const respData = {
      success: true,
      message: 'Profile Updated successfully',
      profile_details: updatedUserData
    }
    return res.status(200).json(respData)
  } catch (error) {
    next(error)
  }
}

async function updatePassword (req, res, next) {
  try {
    const userId = req.user._id
    const password = req.body.new_password

    await userDataServiceProvider.updateUserPasswordById(userId, password)

    const respData = {
      success: true,
      message: 'Password updated successfully'
    }
    return res.status(200).json(respData)
  } catch (error) {
    next(error)
  }
}

export {
  signIn,
  profile,
  updateProfile,
  updatePassword,
  register,
}
