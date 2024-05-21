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

function companyValidation() {
  return [
    body('name')
      .exists()
      .withMessage((value, { req, location, path }) => {
        return getMessage(req, 'company.required.name');
      }),
    body('cnpj')
      .exists()
      .withMessage((value, { req, location, path }) => {
        return getMessage(req, 'company.required.cnpj');
      }),      
  ];
}

export { userValidation as userValidation, companyValidation as companyValidation};
