import React, { useMemo } from 'react'

import numeral from 'numeral'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
} from 'react-neu'
import { useWallet } from 'use-wallet'
import styled from 'styled-components'

import Label from 'components/Label'
import Value from 'components/Value'

import useBalances from 'hooks/useBalances';

const AddLiquidity: React.FC = () => {
  const { status } = useWallet()
  const { uniswapEthDpiLpBalance } = useBalances()

  const AddLiquidityAction = useMemo(() => {
    if (status !== 'connected') {
      return (
        <Button
          disabled
          full
          text="Add Liquidity"
          variant="secondary"
        />
      )
    }

    return (
      <Button
        full
        href="https://app.uniswap.org/#/add/0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b/ETH"
        text="Add Liquidity"
      />
    )
  }, [
    status,
  ])

  const formattedLpBalance = useMemo(() => {
    if (uniswapEthDpiLpBalance) {
      return numeral(uniswapEthDpiLpBalance.toString()).format('0.00000a')
    } else {
      return '--'
    }
  }, [uniswapEthDpiLpBalance])

  return (
    <Card>
      <CardIcon>
        <StyledIcon
          alt="Uniswap LP Icon"
          src="https://set-core.s3.amazonaws.com/img/coin-icons/uni_lp.svg"
        />
      </CardIcon>
      <CardContent>
        <Box
          alignItems="center"
          column
        >
          <Value value={formattedLpBalance} />
          <Label text="ETH/DPI LP Balance" />
        </Box>
      </CardContent>
      <CardActions>
        {AddLiquidityAction}
      </CardActions>
    </Card>
  )
}

const StyledIcon = styled.img`
  height: 58px;
  text-align: center;
  min-width: 58px;
`

export default AddLiquidity
