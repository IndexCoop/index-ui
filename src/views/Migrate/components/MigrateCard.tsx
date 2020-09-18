import React from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardTitle,
} from 'react-neu'

import FancyValue from 'components/FancyValue'

import useMigration from 'hooks/useMigration'

const MigrateCard: React.FC = () => {
  const {
    isApproved,
    isApproving,
    onApprove,
  } = useMigration()
  return (
    <Card>
      <CardContent>
        <FancyValue
          icon="🍠"
          label="YAMV2 balance"
          value="--"
        />
      </CardContent>
      <CardActions>
        {isApproved ? (
          <Button
            full
            onClick={() => console.log('here')}
            text="Migrate"
          />
        ) : (
          <Button
            disabled={isApproving}
            full
            onClick={onApprove}
            text={!isApproving ? "Approve Migrator" : "Approving migrator..."}
          />
        )}
      </CardActions>
    </Card>
  )
}

export default MigrateCard