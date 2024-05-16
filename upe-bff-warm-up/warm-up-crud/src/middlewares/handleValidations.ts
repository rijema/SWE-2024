import { body } from 'express-validator';
import { getMessage } from '../util/util';

function userValidation() {
  return [
    body('name')
      .exists()
      .withMessage((value, { req, location, path }) => {
        return getMessage(req, 'user.required.name');
      }),
    body('cpf')
      .exists()
      .withMessage((value, { req, location, path }) => {
        return getMessage(req, 'user.required.cpf');
      }),      
  ];
}

export { userValidation as userValidation };
