import { useCallback } from 'react'

import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { approve } from 'utils'

const useApproval = (tokenAddress: string, spenderAddress: string) => {
  const { account, ethereum }: { account: string | null, ethereum?: provider} = useWallet()

  const handleApprove = useCallback(async () => {
    if (!ethereum || !account) {
      return
    }
    try {
      const tx = await approve(account, spenderAddress, tokenAddress, ethereum)
      return tx
    } catch (e) {
      return false
    }
  }, [account, ethereum, spenderAddress, tokenAddress])

  return { onApprove: handleApprove }
}

export default useApproval