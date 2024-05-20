import axios from 'axios'
import { logger } from './common/helpers/logger'
import { EtherScanTx } from './models/EtherScanTx'

export async function getTransactionsBySenderEtherscan(): Promise<EtherScanTx[]> {
  logger.info('getTransactionsBySenderEtherscan started')

  if (!process.env.OPERATOR_ADDRESS) {
    throw new Error('No OPERATOR_ADDRESS in ENV')
  }
  if (!process.env.ETHERSCAN_API_KEY) {
    throw new Error('No ETHERSCAN_API_KEY in ENV')
  }
  if (!process.env.START_BLOCK) {
    throw new Error('No START_BLOCK in ENV')
  }
  if (!process.env.END_BLOCK) {
    throw new Error('No END_BLOCK in ENV')
  }

  const url = `https://api.etherscan.io/api`;
  const params = {
    module: 'account',
    action: 'txlist',
    address: process.env.OPERATOR_ADDRESS,
    startblock: Number(process.env.START_BLOCK),
    endblock: Number(process.env.END_BLOCK),
    sort: 'asc',
    apikey: process.env.ETHERSCAN_API_KEY
  };

  try {
    const response = await axios.get(url, { params });
    if (response.data.status === '1') {

      logger.info('getTransactionsBySenderEtherscan finished')
      return response.data.result as EtherScanTx[];
    } else {
      console.error(response.data.message);

      logger.info('getTransactionsBySenderEtherscan finished')
      return [];
    }
  } catch (error) {
    console.error(error);

    logger.info('getTransactionsBySenderEtherscan finished')
    return [];
  }
}
