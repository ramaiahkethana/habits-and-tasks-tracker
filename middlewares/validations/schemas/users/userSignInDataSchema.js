import Joi from 'joi'

const UserSignInSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
})

export default UserSignInSchema