import express, { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';

import {
  createDate,
  mongoWrapper,
} from '@swe/warm-up-common';

import { validateRequest, BadRequestError } from '@swe/warm-up-common';
import { UserSchema, UserDoc } from '../../models/user';
import { userValidation } from '../../middlewares/handleValidations';
import { getMessage } from '../../util/util';

const router = express.Router();

/**
 * Criar a Etapa
 */
router.put(
  '/api/crud/users',
  userValidation(),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name = sanitizeHtml(req.body.name) as string;
      const cpf = sanitizeHtml(req.body.cpf) as string;
      const phone = sanitizeHtml(req.body.phone) as string;
      const birthday = sanitizeHtml(req.body.birthday) as string;

      const tenant: string = 'upe';

      const User = await mongoWrapper.getModel<UserDoc>(
        tenant,
        'User',
        UserSchema
      );

      // consulta se já existe
        const hasUser = await User.findOne({
          cpf: cpf,
        });
  
        if (hasUser) {
          throw new BadRequestError('Usuário já existe.');
        }


      const user = new User({
        name: name,
        cpf: cpf,
        phone: phone,
        birthday: new Date(birthday),
        creationDate: createDate(),
        updateDate: createDate(),
      });

      await user.save();

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

export { router as newUserRouter };
