import { useMemo } from 'react'

import {
  yUsd as yUsdAddress,
  yamv3 as yamV3Address,
} from 'constants/tokenAddresses'

import usePrices from 'hooks/usePrices'
import useTokenBalance from 'hooks/useTokenBalance'

const treasuryAddress = '0xcf27ca116dd5c7b4201c75b46489d1c075362087'

const useTreasury = () => {
  const { yamTwap } = usePrices()
  const yamBalance = useTokenBalance(treasuryAddress, yamV3Address)
  const yUsdBalance = useTokenBalance(treasuryAddress, yUsdAddress)

  const totalYUsdValue = useMemo(() => {
    if (!yamTwap || !yamBalance || !yUsdBalance) {
      return undefined
    }
    const yamYUsdValue = yamTwap * yamBalance
    return yUsdBalance + yamYUsdValue
  }, [
    yamBalance,
    yamTwap,
    yUsdBalance,
  ])

  return {
    totalYUsdValue,
    yamBalance,
    yUsdBalance,
  }
}

export default useTreasury