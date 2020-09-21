import React, { useCallback, useEffect, useState } from 'react'

import numeral from 'numeral'
import {
  Box,
  Card,
  CardContent,
  Spacer,
} from 'react-neu'

import FancyValue from 'components/FancyValue'
import useYam from 'hooks/useYam'
import { bnToDec } from 'utils'
import {
  getCurrentPrice,
  getScalingFactor,
} from 'yam-sdk/utils'

const Stats: React.FC = () => {
  const [currentPrice, setCurrentPrice] = useState<string>()
  const [scalingFactor, setScalingFactor] = useState<string>()
  const yam = useYam()
  const fetchStats = useCallback(async () => {
    if (!yam) return
    const price = await getCurrentPrice(yam)
    const factor = await getScalingFactor(yam)
    setCurrentPrice(numeral(bnToDec(price)).format('0.00a'))
    setScalingFactor(numeral(bnToDec(factor)).format('0.00a'))
  }, [
    setCurrentPrice,
    setScalingFactor,
    yam,
  ])
  useEffect(() => {
    fetchStats()
    let refreshInterval = setInterval(fetchStats, 10000)
    return () => clearInterval(refreshInterval)
  }, [
    fetchStats,
    yam
  ])
  return (
    <Box column>
      <Card>
        <CardContent>
          <FancyValue
            icon="💲"
            label="Current price (TWAP)"
            value={currentPrice ? currentPrice : '--'}
          />
        </CardContent>
      </Card>
      <Spacer />
      <Card>
        <CardContent>
          <FancyValue
            icon="🎯"
            label="Target price"
            value="1 yUSD"
          />
        </CardContent>
      </Card>
      <Spacer />
      <Card>
        <CardContent>
          <FancyValue
            icon="🚀"
            label="Scaling factor"
            value={scalingFactor ? scalingFactor : '--'}
          />
        </CardContent>
      </Card>
    </Box>
  )
}

export default Stats