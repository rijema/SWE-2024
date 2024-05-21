import {
    mongoWrapper,
    NotFoundError,
    sanitizeString,
    validateRequest,
    createDate,
  } from '@swe/warm-up-common';
  import express, { NextFunction, Request, Response } from 'express';
  import sanitizeHtml from 'sanitize-html';
  import { companyValidation } from '../../middlewares/handleValidations';
  import { CompanyDoc, CompanySchema } from '../../models/company';
  
  const router = express.Router();
  
  /**
   * Atualizar
   */
  router.post(
    '/api/crud/company/:companyId',
    companyValidation(),
    validateRequest,
    updateCompany
  );
  
  async function updateCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = sanitizeString(req.params.companyId) as string;
      const tenant: string = 'upe';
  
      const name = sanitizeHtml(req.body.name);
      const cnpj = sanitizeHtml(req.body.cnpj);
  
      const Company = await mongoWrapper.getModel<CompanyDoc>(
        tenant,
        'Company',
        CompanySchema
      );
  
      let company = await Company.findOne({
        _id: companyId,
      });
      if (!company) {
        throw new NotFoundError();
      }
  
      company.name = name;
      company.cnpj = cnpj;
      
      company.updateDate = createDate();
  
      await company.save();
  
      res.status(200).json(company);
    } catch (error) {
      next(error);
    }
  }
  
  export { router as updateCompanyRouter };
  