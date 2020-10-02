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

import Label from 'components/Label'
import Value from 'components/Value'

import useFarming from 'hooks/useFarming'

import useBalances from 'hooks/useBalances';

const Harvest: React.FC = () => {
  const {
    onHarvest,
  } = useFarming()

  const { status } = useWallet()
  const { unharvestedIndexBalance } = useBalances()

  const HarvestAction = useMemo(() => {
    if (status !== 'connected') {
      return (
        <Button
          disabled
          full
          text="Claim"
          variant="secondary"
        />
      )
    }
    return (
      <Button
        full
        onClick={onHarvest}
        text="Claim"
      />
    )
  }, [
    status,
    onHarvest,
  ])

  const formattedEarnedBalance = useMemo(() => {
    if (unharvestedIndexBalance) {
      return numeral(unharvestedIndexBalance.toString()).format('0.00a')
    } else {
      return '--'
    }
  }, [unharvestedIndexBalance])

  return (
    <Card>
      <CardIcon>🦉</CardIcon>
      <CardContent>
        <Box
          alignItems="center"
          column
        >
          <Value value={formattedEarnedBalance} />
          <Label text="Unclaimed INDEX" />
        </Box>
      </CardContent>
      <CardActions>
        {HarvestAction}
      </CardActions>
    </Card>
  )
}

export default Harvest
