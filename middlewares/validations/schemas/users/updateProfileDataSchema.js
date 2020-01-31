import Joi from 'joi'

const updateProfileDataSchema = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  designation: Joi.string(),
  email: Joi.string().email(),
})

export default updateProfileDataSchema