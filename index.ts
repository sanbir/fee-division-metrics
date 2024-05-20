import 'dotenv/config'
import express, { Request, Response } from 'express'
import { logger } from './scripts/common/helpers/logger'
const app = express()

app.get('/', (req: Request, res: Response) => {
  res.send('fee-division-metrics server')
})

app.listen(process.env.PORT, () =>
  logger.info('Server started on port', process.env.PORT),
)
