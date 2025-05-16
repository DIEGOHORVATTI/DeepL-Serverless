import axios from 'axios'

import { SupportedLanguage } from './languages'

export type TranslationOptions = {
  text: string
  from: SupportedLanguage
  to: SupportedLanguage
}

/**
 * @param {Props} props
 * @description Função que traduz um texto de um idioma para outro
 * @description A função suporta textos com marcadores {{}} que não devem ser traduzidos
 * @returns {Promise<string>}
 * @throws {Error}
 * @example translatte({ text: 'teste de parametros por colchetes {{notTraduction}}', to: 'en', from: 'pt-br' })
 */
export const translatte = async ({ text, from, to }: TranslationOptions): Promise<string> => {
  return ''
}
