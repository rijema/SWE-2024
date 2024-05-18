import express, { Request, Response, NextFunction } from 'express';
import {
  mongoWrapper,
  validateRequest,
} from '@swe/warm-up-common';
import { UserSchema, UserDoc } from '../../models/user';

const router = express.Router();

/**
 * Listar
 */
router.get(
  '/api/users',
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenant: string = 'upe';

      const User = await mongoWrapper.getModel<UserDoc>(
        tenant,
        'User',
        UserSchema
      );

      const users = await User.find({});

      res.send(users);
      
      
    } catch (error) {
      next(error);
    }
  }
);

export { router as listUserRouter };
