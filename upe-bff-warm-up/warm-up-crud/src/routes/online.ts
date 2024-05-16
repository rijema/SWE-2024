import express from 'express';

const router = express.Router();

/**
 * Rota responsável por verificar se o microserviço está online.
 */

router.get('/api/users/online', (req, res) => {
  res.send('[crud] Online');
});

export { router as onlineRouter };
