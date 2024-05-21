import express, { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';
import { companyValidation } from '../../middlewares/handleValidations';
import { CompanyDoc, CompanySchema } from '../../models/company';

import {
  createDate,
  mongoWrapper,
  validateRequest,
  BadRequestError
} from '@swe/warm-up-common';

const router = express.Router();

/**
 * Criar
 */
router.put(
  '/api/crud/company',
  companyValidation(),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name = sanitizeHtml(req.body.name) as string;
      const cnpj = sanitizeHtml(req.body.cnpj) as string;
      const registration = sanitizeHtml(req.body.registration) as string;
      const legalNature = sanitizeHtml(req.body.legalNature) as string;

      const tenant: string = 'upe';

      const Company = await mongoWrapper.getModel<CompanyDoc>(
        tenant,
        'Company',
        CompanySchema
      );

        const hasCompany = await Company.findOne({
          cnpj: cnpj
        });

        if (hasCompany) {
          throw new BadRequestError('Company já existe, nao eh possivel adicionar');
        }

      const company = new Company({
        name: name,
        cnpj: cnpj,
        registration: registration,
        legalNature: legalNature,
        creationDate: createDate(),
        updateDate: createDate(),
      });

      await company.save();

      res.status(201).json(company);
    } catch (error) {
      next(error);
    }
  }
);

export { router as newCompanyRouter };
