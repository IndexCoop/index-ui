import { useCallback, useState, useEffect } from 'react'

import { provider } from 'web3-core'

import useWallet from 'hooks/useWallet'
import { approve } from 'utils'

import useAllowance from './useAllowance'

const useApproval = (
  tokenAddress?: string,
  spenderAddress?: string,
  onTxHash?: (txHash: string) => void
) => {
  const allowance = useAllowance(tokenAddress, spenderAddress)
  const [isApproving, setIsApproving] = useState(false)
  const [isApproved, setIsApproved] = useState(false)

  const {
    account,
    ethereum,
  }: { account: string | null | undefined; ethereum?: provider } = useWallet()

  const handleApprove = useCallback(async () => {
    if (!ethereum || !account || !spenderAddress || !tokenAddress) {
      return
    }
    try {
      setIsApproving(true)
      const result = await approve(
        account,
        spenderAddress,
        tokenAddress,
        ethereum,
        onTxHash
      )
      setIsApproved(result)
      setIsApproving(false)
    } catch (e) {
      setIsApproving(false)
      return false
    }
  }, [
    account,
    ethereum,
    onTxHash,
    setIsApproved,
    setIsApproving,
    spenderAddress,
    tokenAddress,
  ])

  useEffect(() => {
    if (!!allowance?.toNumber()) {
      setIsApproved(true)
    }
  }, [allowance, setIsApproved])

  return {
    isApproved,
    isApproving,
    onApprove: handleApprove,
  }
}

export default useApproval
