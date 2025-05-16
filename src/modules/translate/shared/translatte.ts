import axios from 'axios'
import { SupportedLanguage } from './languages'

export type TranslationOptions = {
  text: string
  from: SupportedLanguage
  to: SupportedLanguage
}

/**
 * @description Função que traduz um texto de um idioma para outro
 */
export const translatte = async ({ text, from, to }: TranslationOptions): Promise<string> => {
  const baseURL = 'https://www2.deepl.com'
  const urlMethod = 'LMT_handle_texts'
  const urlFull = `${baseURL}/jsonrpc?client=chrome-extension,1.28.0&method=${encodeURIComponent(urlMethod)}`

  const headers = {
    'Content-Type': 'application/json',
    'User-Agent':
      'DeepLBrowserExtension/1.28.0 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
    Accept: '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    Authorization: 'None',
    'Cache-Control': 'no-cache',
    Origin: 'chrome-extension://cofdbpoegempjloogbagkncekinflcnj',
    Referer: 'https://www.deepl.com/'
  }

  const postData = {
    jsonrpc: '2.0',
    method: urlMethod,
    id: 1,
    params: {
      splitting: 'newlines',
      lang: {
        source_lang_user_selected: from.toUpperCase(),
        target_lang: to.toUpperCase()
      },
      texts: [
        {
          text,
          requestAlternatives: 3
        }
      ],
      timestamp: Date.now()
    }
  }

  try {
    const response = await axios.post(urlFull, postData, { headers })

    const translation = response.data?.result?.texts?.[0]?.text ?? ''

    return translation
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro na tradução:', error.response?.data)
    }

    throw new Error('Erro ao traduzir texto.')
  }
}
