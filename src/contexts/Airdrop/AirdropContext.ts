import { createContext } from 'react'

interface AirdropContextValues {
  airdropQuantity?: string
  rewardIndex?: number
  rewardProof?: string[]
  isClaimable?: boolean
  claimableQuantity?: string
}

const AirdropContext = createContext<AirdropContextValues>({})

export default AirdropContext