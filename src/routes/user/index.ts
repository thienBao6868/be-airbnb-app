import userController from '@/controllers/user.controller';
import { catchError, validateRequest } from '@/middleware/validate';
import { createUserSchema } from '@/schema/user.schema';
import express from 'express';

const router = express();

/**
 * @route POST/user/signup
 * @description register new user
 * @body {name, email,password}
 * @access Public
 */
router.post(
    '/signup',
    validateRequest(createUserSchema),
    catchError(userController.createUser)
  );

export default router;
