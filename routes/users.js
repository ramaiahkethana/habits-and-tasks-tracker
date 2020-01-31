import express from 'express';
import authMiddleware from './../middlewares/authMiddleware'
import { 
  signIn,
  profile,
  updateProfile,
  register,
} from './../controllers/userController'
import schemaValidator from "./../middlewares/validations/schemaValidator"
const validateRequest = schemaValidator(true)

const router = express.Router();

router.post('/login', 
  [
    validateRequest
  ], 
  signIn
);

router.post('/register', 
  [
    validateRequest
  ], 
  register,
);

router.get('/profile',
  [
    authMiddleware.checkAuthHeader,
    authMiddleware.validateAccessToken
  ],
  profile,
)

router.patch('/profile',
  [
    authMiddleware.checkAuthHeader,
    authMiddleware.validateAccessToken,
    validateRequest
  ],
  updateProfile,
)

export default router
