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
import styled from 'styled-components'

import Label from 'components/Label'
import Value from 'components/Value'

import useFarming from 'hooks/useFarming'
import useWallet from 'hooks/useWallet'
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
      return numeral(unharvestedIndexBalance.toString()).format('0.00000a')
    } else {
      return '--'
    }
  }, [unharvestedIndexBalance])

  return (
    <Card>
      <CardIcon>
        <StyledIcon
          alt="Owl icon"
          src="https://index-dao.s3.amazonaws.com/owl.png"
        />
      </CardIcon>
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

const StyledIcon = styled.img`
  height: 58px;
  text-align: center;
  min-width: 58px;
`

export default Harvest
