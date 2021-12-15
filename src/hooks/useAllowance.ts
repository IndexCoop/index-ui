import { useCallback, useEffect, useState } from 'react'

import { provider } from 'web3-core'

import useWallet from 'hooks/useWallet'
import { getAllowance } from 'utils'
import BigNumber from 'utils/bignumber'

const useAllowance = (tokenAddress?: string, spenderAddress?: string) => {
  const [allowance, setAllowance] = useState<BigNumber>()
  const {
    account,
    ethereum,
  }: { account: string | null | undefined; ethereum?: provider } = useWallet()

  const fetchAllowance = useCallback(
    async (userAddress: string, provider: provider) => {
      if (!spenderAddress || !tokenAddress) {
        return
      }

      const allowance = await getAllowance(
        userAddress,
        spenderAddress,
        tokenAddress,
        provider
      )

      setAllowance(new BigNumber(allowance))
    },
    [setAllowance, spenderAddress, tokenAddress]
  )

  useEffect(() => {
    if (!account || !ethereum || !spenderAddress || !tokenAddress) {
      return
    }

    fetchAllowance(account, ethereum)

    let refreshInterval = setInterval(
      () => fetchAllowance(account, ethereum),
      10000
    )

    return () => clearInterval(refreshInterval)
  }, [account, ethereum, spenderAddress, tokenAddress, fetchAllowance])

  return allowance
}

export default useAllowance
