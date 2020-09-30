import { createContext } from 'react'
import BigNumber from 'bignumber.js'

interface AirdropContextValues {
  airdropQuantity?: string
  rewardIndex?: number
  rewardProof?: string[]
  isClaimable?: boolean
  claimableQuantity?: BigNumber
}

const AirdropContext = createContext<AirdropContextValues>({})

export default AirdropContext