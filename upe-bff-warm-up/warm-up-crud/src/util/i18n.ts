import i18n from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import i18nextBackend from 'i18next-fs-backend';
import { readdirSync } from 'fs';
import { join } from 'path';
import { logger } from '@swe/warm-up-common';
import { tokenLanguageDetector } from '../middlewares/language-detector';

// Configura idioma com base no Token
const lngDetector = new i18nextMiddleware.LanguageDetector();
lngDetector.addDetector(tokenLanguageDetector);

// Cria namespaces para cada arquivo de tradução
function getNamespaces(): string[] {
  return readdirSync(join(__dirname, '.././locales/en')).map((fileName) =>
    fileName.replace('.json', '')
  );
}

// Configuração de Tradução
i18n
  .use(i18nextBackend)
  .use(lngDetector)
  .init(
    {
      lng: 'pt-br',
      preload: ['en', 'es', 'pt-br'],
      ns: getNamespaces(),
      fallbackLng: 'en',
      backend: {
        loadPath: `./src/locales/{{lng}}/{{ns}}.json`,
        addPath: `./src/locales/{{lng}}/{{ns}}.missing.json`,
      },
      load: 'currentOnly',
      detection: {
        order: ['TokenLanguageDetector'],
        caches: false,
      },
      interpolation: {
        escapeValue: false,
      },
    },
    function (err, t) {
      if (err) {
        logger.error(
          `[app-crud] Erro ao iniciar o Tradutor. Erro = ${err}`
        );
      } else {
        logger.info('[app-crud] Tradutor em execução.');
      }
    }
  );

export { i18n };
