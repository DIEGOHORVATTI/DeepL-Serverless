import { RequestHandler } from 'express'
import { serviceTranslatte } from './service'

export const authenticateUserController: RequestHandler = async (req, res) => {
  const text = await serviceTranslatte(req.body)

  res.json(text)
}
