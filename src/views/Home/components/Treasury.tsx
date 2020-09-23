import React from 'react'

import numeral from 'numeral'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardTitle,
  Spacer,
} from 'react-neu'

import FancyValue from 'components/FancyValue'
import Split from 'components/Split'

import useTreasury from 'hooks/useTreasury'

const Treasury: React.FC = () => {
  const { totalYUsdValue, yamBalance, yUsdBalance } = useTreasury()
  
  const treasuryValue = totalYUsdValue
    ? '$'+numeral(totalYUsdValue * 1.15).format('0.00a')
    : '--'

  const yamValue = yamBalance
    ? numeral(yamBalance).format('0.00a')
    : '--'

  const yUsdValue = yUsdBalance
    ? numeral(yUsdBalance).format('0.00a')
    : '--'

  return (
    <Card>
      <CardTitle text="Treasury Overview" />
      <Spacer size="sm" />
      <CardContent>
        <Split>
          <FancyValue
            icon="💰"
            label="Treasury value"
            value={treasuryValue}
          />
          <FancyValue
            icon="💸"
            label="yUSD in reserves"
            value={yUsdValue}
          />
          <FancyValue
            icon="🍠"
            label="YAM in reserves"
            value={yamValue}
          />
        </Split>
        <Spacer />
      </CardContent>
      <CardActions>
        <Box row justifyContent="center">
          <Button
            href="https://etherscan.io/address/0xcf27ca116dd5c7b4201c75b46489d1c075362087"
            text="View on Etherscan"
            variant="secondary"
          />
        </Box>
      </CardActions>
    </Card>
  )
}

export default Treasury