import express from 'express';
import authMiddleware from './../middlewares/authMiddleware'
import { 
  createHabit,
  updateHabit,
  getAllHabits,
  createHabitLog,
  getHabitLogOfADay,
  getSingleHabit,
} from './../controllers/habitController'
import schemaValidator from "./../middlewares/validations/schemaValidator"
import fileUploadMiddleware from './../middlewares/fileUploadMiddleware'
import customValidations from './../middlewares/customValidationsMiddleware'
const validateRequest = schemaValidator(true)

const router = express.Router();

router.post('/habit', 
  [
    // validateRequest
    authMiddleware.checkAuthHeader,
    authMiddleware.validateAccessToken
  ],
  createHabit,
);

router.patch('/habit/:habit_id', 
  [
    // validateRequest
    authMiddleware.checkAuthHeader,
    authMiddleware.validateAccessToken
  ],
  updateHabit,
);

router.get('/habit',
  [
    authMiddleware.checkAuthHeader,
    authMiddleware.validateAccessToken
  ],
  getAllHabits,
)

router.get('/habit/:habit_id',
  [
    authMiddleware.checkAuthHeader,
    authMiddleware.validateAccessToken
  ],
  getSingleHabit,
)

router.post('/habit-log', 
  [
    // validateRequest,
    authMiddleware.checkAuthHeader,
    authMiddleware.validateAccessToken
  ],
  createHabitLog,
);

router.patch('/habit-log', 
  [
  //   validateRequest
    authMiddleware.checkAuthHeader,
    authMiddleware.validateAccessToken
  ],
  getHabitLogOfADay,
);

export default router
