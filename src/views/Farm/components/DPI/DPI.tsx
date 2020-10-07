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

const DPI: React.FC = () => {
  const { status } = useWallet()
  const { dpiBalance } = useBalances()

  const DPIAction = useMemo(() => {
    if (status !== 'connected') {
      return (
        <Button
          disabled
          full
          text="Get DPI Tokens"
          variant="secondary"
        />
      )
    }

    return (
      <Button
        full
        href="https://www.tokensets.com/portfolio/dpi"
        text="Get DPI Tokens"
      />
    )
  }, [
    status,
  ])

  const formattedDpiBalance = useMemo(() => {
    if (dpiBalance) {
      return numeral(dpiBalance.toString()).format('0.00000a')
    } else {
      return '--'
    }
  }, [dpiBalance])

  return (
    <Card>
      <CardIcon>
        <StyledIcon
          alt="DeFi Pulse Icon"
          src="https://set-core.s3.amazonaws.com/img/social_trader_set_icons/defi_pulse_index_set.svg"
        />
      </CardIcon>
      <CardContent>
        <Box
          alignItems="center"
          column
        >
          <Value value={formattedDpiBalance} />
          <Label text="DPI Balance" />
        </Box>
      </CardContent>
      <CardActions>
        {DPIAction}
      </CardActions>
    </Card>
  )
}

const StyledIcon = styled.img`
  height: 58px;
  text-align: center;
  min-width: 58px;
`

export default DPI
