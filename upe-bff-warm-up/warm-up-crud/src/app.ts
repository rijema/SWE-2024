import jwt from 'express-jwt';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json } from 'body-parser';
import helmet from 'helmet';

import {
  errorHandler,
  NotFoundError,
  loggerWrite,
  authErrorInterceptor,
  TokenLanguageDetector,
  tenantInterceptor,
} from '@swe/warm-up-common';

import { onlineRouter } from './routes/online';

import { listUserRouter } from './routes/list';
import { deleteUserRouter } from './routes/delete';
import { newUserRouter } from './routes/new';
import { updateUserRouter } from './routes/update';
import i18nextMiddleware from 'i18next-http-middleware';
import { readdirSync } from 'fs';
import { join } from 'path';
import { authRouter } from './routes/auth';
import { findUserRouter } from './routes/find';
import { healthcheckRoutes } from './app.constants';

import { i18n } from './util/i18n';

require('dotenv').config();

const app = express();
app.set('trust proxy', true);
// Correção de segurança
app.use(helmet());
app.use(json());
app.use(cors());

if (process.env.NODE_ENV != 'local') {
  //Define para colocar no LOG as informações de origem: DATA, METHOD, API, ORIGEM
  app.use(morgan('combined', { stream: loggerWrite }));
}
// Autenticação com JWT
// app.use(
//   jwt({
//     secret: process.env.JWT_SECRET as string,
//     algorithms: ['HS512'],
//   }).unless({
//     path: healthcheckRoutes,
//   })
// );

// Middleware para tratar erros na validação do JWT
// app.use(authErrorInterceptor);

// Configura idioma com base no Token
const lngDetector = new i18nextMiddleware.LanguageDetector();
lngDetector.addDetector(new TokenLanguageDetector());

// Cria namespaces para cada arquivo de tradução
function getNamespaces(): string[] {
  return readdirSync(join(__dirname, './locales/en')).map((fileName) =>
    fileName.replace('.json', '')
  );
}

// Middleware de Tradução
app.use(
  i18nextMiddleware.handle(i18n, {
    ignoreRoutes: healthcheckRoutes,
  })
);

// Rotas abertas
app.use(onlineRouter);
// Endpoint de autenticação
app.use(authRouter);

// Interceptor que extrai tenant do Token
// app.use(tenantInterceptor);e

// Endpoints de Negócio
app.use(listUserRouter);
app.use(findUserRouter);
app.use(deleteUserRouter);
app.use(newUserRouter);
app.use(updateUserRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
