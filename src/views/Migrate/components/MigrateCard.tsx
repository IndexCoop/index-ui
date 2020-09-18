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

import Label from 'components/Label'
import Value from 'components/Value'

import useBalances from 'hooks/useBalances'
import useMigration from 'hooks/useMigration'

const MigrateCard: React.FC = () => {
  const { yamV2Balance } = useBalances()
  const {
    isApproved,
    isApproving,
    isMigrating,
    onApprove,
    onMigrate,
  } = useMigration()

  const yamV2DisplayBalance = useMemo(() => {
    if (yamV2Balance) {
      return numeral(yamV2Balance).format('0.00a')
    } else {
      return '--'
    }
  }, [yamV2Balance])

  const ActionButton = useMemo(() => {
    const hasYams = yamV2Balance && yamV2Balance.toNumber() > 0
    if (isMigrating) {
      return (
        <Button
          disabled
          full
          text="Migrating..."
          variant="secondary"
        />
      )
    }
    if (isApproved) {
      return (
        <Button
          disabled={!hasYams}
          full
          onClick={onMigrate}
          text="Migrate"
          variant={hasYams ? 'default' : 'secondary'}
        />
      )
    }
    return (
      <Button
        disabled={isApproving}
        full
        onClick={onApprove}
        text={!isApproving ? "Approve Migrator" : "Approving migrator..."}
        variant={isApproving ? 'secondary' : 'default'}
      />
    )
  }, [
    isApproved,
    isApproving,
    isMigrating,
    onApprove,
    onMigrate,
    yamV2Balance
  ])

  return (
    <Card>
      <CardIcon>🍠</CardIcon>
      <CardContent>
        <Box alignItems="center" column>
          <Value value={yamV2DisplayBalance} />
          <Label text="YAMV2 balance" />
        </Box>
      </CardContent>
      <CardActions>
        {ActionButton}
      </CardActions>
    </Card>
  )
}

export default MigrateCard