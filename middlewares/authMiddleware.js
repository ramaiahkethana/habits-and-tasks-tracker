
import jwt from 'jsonwebtoken'
import config from '../config/app'
import userDataServiceProvider from '../services/database/userDataServiceProvider'

exports.checkAuthHeader = function (req, res, next) {
  if (!req.headers.authorization) {
    var respData = {
      success: false,
      message: 'No Authorization Token'
    }
    return res.status(403).json(respData)
  }
  next()
}

exports.validateAccessToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization

    // Decode JWT received via Header
    const userDetails = jwt.decode(accessToken)
    // Fetch User From DB
    const user = await userDataServiceProvider.getUserByUsername(userDetails.username)

    if (!user) {
      let respData = {
        success: false,
        message: 'Invalid Credentials!'
      }

      return res.status(401).json(respData)
    }

    const tokenSecret = config.jwt.token_secret + user.password

    try {
      // Verify JWT
      jwt.verify(accessToken, tokenSecret)

      // Add User to the Request Payload
      req.user = user

      next()
    } catch (error) {
      var respData = {
        success: false,
        message: error.message,
        error: error
      }
      return res.status(401).json(respData)
    }
  } catch (error) {
    console.log(error)
    var respData = {
      success: false,
      message: 'Invalid Access Token'
    }

    return res.status(401).json(respData)
  }
}

exports.isSuperAdmin = (req, res, next) => {
  if (
    !req.user ||
    !req.user.user_type ||
    req.user.user_type !== 'SUPERADMIN') {
    var respData = {
      success: false,
      message: 'Unauthorised Access'
    }
    return res.status(403).json(respData)
  }
  next()
}

exports.isAdmin = (req, res, next) => {
  if (
    !req.user ||
    !req.user.user_type ||
    req.user.user_type !== 'ADMIN') {
    var respData = {
      success: false,
      message: 'Unauthorised Access'
    }
    return res.status(403).json(respData)
  }
  next()
}

exports.isAuthUserActive = (req, res, next) => {
  const userData = req.user

  if (!userData) {
    return res.status(401).json({
      success: false,
      message: 'Invalid Credentials!'
    })
  }

  if (userData.status === 'HOLD') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden. Account on Hold'
    })
  } else if (userData.status === 'DELETED') {
    return res.status(401).json({
      success: false,
      message: 'Invalid Credentials!'
    })
  }
  next()
}

exports.isUserExistById = async (req, res, next) => {
  try {
    const requestedUser = await userDataServiceProvider.getUserById(req.body.user_id)
    if (!requestedUser) {
      return res.status(422).json({
        success: false,
        message: 'Invalid user details'
      })
    }
    req.requested_user_details = requestedUser
    next()
  } catch (error) {
    next(error)
  }
}

exports.isUserExistByPhone = async (req, res, next) => {
  try {
    const requestedUser = await userDataServiceProvider.getUserByPhone(req.body.phone_number)
    if (!requestedUser) {
      return res.status(422).json({
        success: false,
        message: 'User not exist with Phone Number'
      })
    }
    req.requested_user_details = requestedUser
    next()
  } catch (error) {
    next(error)
  }
}