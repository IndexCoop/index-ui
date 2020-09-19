import React, { useMemo } from 'react'

import numeral from 'numeral'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon
} from 'react-neu'

import Label from 'components/Label'
import Value from 'components/Value'

import useVesting from 'hooks/useVesting'

const ClaimCard: React.FC = () => {
  const { isClaiming, onClaim, vestedBalance } = useVesting()

  const vestingBalanceDisplayValue = useMemo(() => {
    if (vestedBalance) {
      return numeral(vestedBalance).format('0.00a')
    }
    return '--'
  }, [vestedBalance])

  const ClaimButton = useMemo(() => {
    const hasVestedYams = vestedBalance && vestedBalance.toNumber() > 0
    if (isClaiming) {
      return (
        <Button
          disabled
          full
          text="Claiming..."
          variant="secondary"
        />
      )
    }
    if (hasVestedYams) {
      return (
        <Button
          full
          onClick={onClaim}
          text="Claim YAMs"
        />
      )
    }
    return (
      <Button
        disabled
        full
        text="Claim"
        variant="secondary"
      />
    )
  }, [
    isClaiming,
    onClaim,
    vestedBalance,
  ])

  return (
    <Card>
      <CardIcon>🦋 + 🎁</CardIcon>
      <CardContent>
        <Box alignItems="center" column>
          <Value value={vestingBalanceDisplayValue} />
          <Label text="Vested YAMs" />
        </Box>
      </CardContent>
      <CardActions>
        {ClaimButton}
      </CardActions>
    </Card>
  )
}

export default ClaimCard