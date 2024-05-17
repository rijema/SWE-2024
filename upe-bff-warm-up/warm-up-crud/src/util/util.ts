import { i18n } from './i18n';

/**
 * Pega a mensagem de acordo com a tradução
 * @param key
 * @param lang
 * @returns
 */
export function getMessage(req: any, key: string) {
  let language = getUserLanguage(req);
  return i18n.t(key, {
    ns: 'errors',
    lng: language,
  });
}

