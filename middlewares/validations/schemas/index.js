
/** Users Common APIs */
import UserSignInDataSchema from './users/userSignInDataSchema'
import UpdateProfileDataSchema from './users/updateProfileDataSchema'

const SchemasMap = {
  '/login': UserSignInDataSchema,
  '/profile': {
    multi: true,
    patch: UpdateProfileDataSchema
  },
}

export default SchemasMap
