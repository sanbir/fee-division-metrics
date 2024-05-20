import 'dotenv/config'
import { logger } from './scripts/common/helpers/logger'
import { getTransactionsBySenderEtherscan } from './scripts/getTransactionsBySenderEtherscan'

async function main() {
  logger.info('97-test started')

  getTransactionsBySenderEtherscan()
    .then(transactions => console.log(transactions))
    .catch(error => console.error(error))

  logger.info('97-test finished')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
