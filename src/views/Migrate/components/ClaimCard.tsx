import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
} from 'react-neu'

import FancyValue from 'components/FancyValue'

const ClaimCard: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <FancyValue
          icon="🎁"
          label="Vested YAMs"
          value="100"
        />
      </CardContent>
      <CardActions>
        <Button full text="Claim" />
      </CardActions>
    </Card>
  )
}

export default ClaimCard