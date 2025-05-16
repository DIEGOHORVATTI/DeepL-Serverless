import { langs, SupportedLanguage } from './shared/languages'
import { TranslationOptions, translatte } from './shared/translatte'

import * as z from 'zod'

export const TranslatteSchema = z.object({
  text: z.string(),
  to: z.enum(Object.keys(langs) as [SupportedLanguage, ...SupportedLanguage[]]),
  from: z.enum(Object.keys(langs) as [SupportedLanguage, ...SupportedLanguage[]]).optional()
})

const MAX_RETRIES = 3

export const serviceTranslatte = async (data: TranslationOptions) => {
  const { text, to, from = 'auto' } = TranslatteSchema.parse(data)

  let attempts = 0
  while (attempts < MAX_RETRIES) {
    try {
      const translatedText = await translatte({ text, to, from })

      return translatedText
    } catch (error) {
      attempts++

      console.error(`Attempt ${attempts} failed:`, error)
    }
  }

  return text
}
