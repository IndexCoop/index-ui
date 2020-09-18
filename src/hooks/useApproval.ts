import { useCallback, useState, useEffect } from 'react'

import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { approve } from 'utils'

import useAllowance from './useAllowance'

const useApproval = (tokenAddress: string, spenderAddress: string) => {
  const allowance = useAllowance(tokenAddress, spenderAddress)
  const [isApproving, setIsApproving] = useState(false)
  const [isApproved, setIsApproved] = useState(false)

  const { account, ethereum }: { account: string | null, ethereum?: provider} = useWallet()

  const handleApprove = useCallback(async () => {
    if (!ethereum || !account) {
      return
    }
    try {
      setIsApproving(true)
      const result = await approve(account, spenderAddress, tokenAddress, ethereum)
      setIsApproved(result)
      setIsApproving(false)
    } catch (e) {
      return false
    }
  }, [
    account,
    ethereum,
    setIsApproved,
    setIsApproving,
    spenderAddress,
    tokenAddress,
  ])

  useEffect(() => {
    if (!!allowance?.toNumber()) {
      setIsApproved(true)
    }
  }, [
    allowance,
    setIsApproved,
  ])

  return {
    isApproved,
    isApproving,
    onApprove: handleApprove,
  }
}

export default useApproval