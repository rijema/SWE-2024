import express, { Request, Response, NextFunction } from 'express';

import {
  sanitizeString,
  validateRequest,
  mongoWrapper,
} from '@swe/warm-up-common';

import { CompanyDoc, CompanySchema } from '../../models/company';

const router = express.Router();

/**
 * Remover
 */
router.delete(
  '/api/crud/company/:companyId',
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenant: string = 'upe';

      const companyId = sanitizeString(req.params.companyId) as string;
      const Company = await mongoWrapper.getModel<CompanyDoc>(
        tenant,
        'Company',
        CompanySchema
      );
      await Company.deleteMany({
        _id: companyId,
      }).exec();

      res.status(200).json('OK');
    } catch (error) {
      next(error);
    }
  }
);

export { router as deleteCompanyRouter };
