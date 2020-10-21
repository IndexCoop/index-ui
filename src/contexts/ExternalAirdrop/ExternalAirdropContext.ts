import { createContext } from 'react'
import BigNumber from 'utils/bignumber'

interface AirdropContextValues {
  externalAddress?: string
  airdropQuantity?: string
  rewardIndex?: number
  rewardProof?: string[]
  isClaimable?: boolean
  claimErrorMessage?: string
  claimableQuantity?: BigNumber
  onUpdateAddress: (address: string) => void
  onCheckAirdropClaim: () => void
  onClaimAirdrop: () => void
}

const AirdropContext = createContext<AirdropContextValues>({
  onUpdateAddress: () => {},
  onCheckAirdropClaim: () => {},
  onClaimAirdrop: () => {},
})

export default AirdropContext
