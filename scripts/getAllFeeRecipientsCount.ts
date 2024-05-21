import { logger } from './common/helpers/logger'
import { getProposers } from './getProposers'
import { getFdAddressesWithPeriodsFromApi } from './getFdAddressesWithPeriodsFromApi'
import { getV2Distributors } from './getV2Distributors'

export async function getAllFeeRecipientsCount() {
  logger.info('getAllFeeRecipientsCount started')

  const proposers = await getProposers()
  const fdAddressesWithPeriodsFromApi = await getFdAddressesWithPeriodsFromApi()
  const v2Distributors = getV2Distributors()

  const all: Set<string> = new Set()

  const pubkeys = Object.keys(proposers)
  for (const pubkey of pubkeys) {
    const fee_recipient = proposers[pubkey].fee_recipient
    all.add(fee_recipient.toLowerCase())
  }

  const fdsFromApi = Object.keys(fdAddressesWithPeriodsFromApi)
  for (const fdFromApi of fdsFromApi) {
    all.add(fdFromApi.toLowerCase())
  }

  for (const v2 of v2Distributors) {
    all.add(v2.toLowerCase())
  }

  logger.info('getAllFeeRecipientsCount finished')

  return all.size
}