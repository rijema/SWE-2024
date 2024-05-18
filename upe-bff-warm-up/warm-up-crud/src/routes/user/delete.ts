import express, { Request, Response, NextFunction } from 'express';

import {
  sanitizeString,
  validateRequest,
  mongoWrapper,
} from '@swe/warm-up-common';

import { UserDoc, UserSchema } from '../../models/user';

const router = express.Router();

/**
 * Remover a Etapa
 */
router.delete(
  '/api/crud/users/:userId',
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenant: string = 'upe';

      const userId = sanitizeString(req.params.userId) as string;
      const User = await mongoWrapper.getModel<UserDoc>(
        tenant,
        'User',
        UserSchema
      );
      await User.deleteMany({
        _id: userId,
      }).exec();

      res.status(200).json('OK');
    } catch (error) {
      next(error);
    }
  }
);

export { router as deleteUserRouter };
