import { holesky, mainnet } from 'viem/chains'
import { createPublicClient, http } from 'viem'
import process from 'process'

if (!process.env.RPC_URL) {
  throw new Error('No RPC_URL in ENV')
}

export const isHolesky = process.env.RPC_URL.includes('holesky')

const chain = isHolesky
  ? holesky
  : process.env.RPC_URL.includes('mainnet')
    ? mainnet
    : null

if (!chain) {
  throw new Error('Chain is not clear from RPC_URL. Use Infura')
}

export const publicClient = createPublicClient({
  chain,
  transport: http(process.env.RPC_URL),
})
