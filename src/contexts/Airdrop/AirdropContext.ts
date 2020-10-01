import { createContext } from 'react'
import BigNumber from 'bignumber.js'

interface AirdropContextValues {
  airdropQuantity?: string
  rewardIndex?: number
  rewardProof?: string[]
  isClaimable?: boolean
  claimableQuantity?: BigNumber
  onClaimAirdrop: () => void
}

const AirdropContext = createContext<AirdropContextValues>({
  onClaimAirdrop: () => {},
})

export default AirdropContext
