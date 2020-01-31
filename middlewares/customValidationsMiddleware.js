import userDataServiceProvider from '../services/database/userDataServiceProvider'
exports.emailExists = async (req, res, next) => {
  const emailExists = await userDataServiceProvider.emailExists(req.body.email)
  if (emailExists) {
    var respData = {
      success: false,
      message: 'Account With This Email is Already Taken'
    }

    return res.status(403).json(respData)
  }
  next()
}

exports.checkCurrentPassword = async (req, res, next) => {
  const passwordMatched = await userDataServiceProvider.checkCurrentPassword(req.user._id, req.body.current_password)

  if (!passwordMatched) {
    var respData = {
      success: false,
      message: 'Current password is wrong'
    }

    return res.status(403).json(respData)
  }

  next()
}

exports.checkPhoneNumberExist = async (req, res, next) => {

  const isNewPhone = req.user.phone_number !== req.body.phone_number

  if (!isNewPhone) {
    const respData = {
      success: false,
      message: 'New Phone Number and existed phone number are should not same'
    }
    return res.status(403).json(respData)
  }

  const phoneNumberMatch = await userDataServiceProvider.checkPhoneExistance(req.user._id, req.body.phone_number)
  if (phoneNumberMatch) {
    const respData = {
      success: false,
      message: 'New Phone Number Already Existed with another User'
    }
    return res.status(403).json(respData)
  }
  next()
}

exports.parseSkipAndLimitAndSortParams = async (req, res, next) => {
  let { page = 1, limit = 10 } = req.body

  const { order_by: orderBy, order_type: orderType } = req.body

  let skip = 0
  const sort = {}

  if (page === 0) {
    limit = null
    skip = null
  } else if (page && limit) {
    skip = (page - 1) * limit
  }

  if (orderBy) {
    sort[`${orderBy}`] = orderType === 'desc' ? -1 : 1
  }

  req.parsedFilterParams = {
    skip,
    limit,
    query: {},
    sort
  }

  next()
}
