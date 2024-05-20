import { logger } from './logger'

export function logEnv() {
  logger.info('RPC_URL', process.env.RPC_URL)
}
