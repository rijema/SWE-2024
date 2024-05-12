import { Request, Response } from 'express';

import { logger } from '@swe/warm-up-common';

async function readinessController(req: Request, res: Response) {
  logger.info('Checking Readiness');
  let readiness = req.app.locals.readiness;
  let code: number = 500;

  if (readiness) {
    code = 200;
  }

  logger.info('[ms-crud:readinss] Readiness: ' + readiness);
  res.status(code).json('[ms-crud:readiness] readiness: ' + readiness);
}

export { readinessController };
