import { createContext } from 'react'

interface AirdropContextValues {
  claimableQuantity?: string
  rewardIndex?: number
  rewardProof?: string[]
  isClaimed?: boolean
}

const AirdropContext = createContext<AirdropContextValues>({})

export default AirdropContext