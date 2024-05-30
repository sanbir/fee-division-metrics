export interface FinalReport {
  start_execution_timestamp: string
  end_execution_timestamp: string
  gas_spent: string
  total_ETH_distributed: string
  total_ETH_client_part: string
  total_ETH_P2P_part: string
  total_ETH_referrer_part: string
  addresses_scanned: string
  fee_dividers_used: string
  new_fee_dividers_deployed: string
  legacy_divisions: string
}