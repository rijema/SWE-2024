import express, { Request, Response, NextFunction } from 'express';
import {  validateRequest } from '@swe/warm-up-common';
import jwt from 'jsonwebtoken';
import sanitizeHtml from 'sanitize-html';

const router = express.Router();

/**
 * Verifica Permissão do Usuário ao acessar
 */
router.get(
  '/api/auth',
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      const name = sanitizeHtml(req.body.name);

      if(name === 'admin' ){ 

        const id = 1; //id do banco
        const token = jwt.sign({ id, tenant: 'upe' }, 'my-secret-token', {
          expiresIn: 3600 // 1 hora
        });
        return res.json({ auth: true, token: token });
      }

      res.status(500).json({message: 'Login inválido!'});
    } catch (error) {
      next(error);
    }
  }
);

export { router as authRouter };
