export interface FinalReport {
  execution_timestamp: string
  gas_spent: string
  total_ETH_distributed: string
  total_ETH_client_part: string
  total_ETH_P2P_part: string
  total_ETH_referrer_part: string
  addresses_scanned: number
  fee_dividers_used: number
  new_fee_dividers_deployed: number
  legacy_divisions: number
}