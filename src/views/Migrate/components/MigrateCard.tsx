import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
} from 'react-neu'

const MigrateCard: React.FC = () => {
  return (
    <Card>
      <CardContent></CardContent>
      <CardActions>
        <Button
          full
          text="Migrate"
        />
      </CardActions>
    </Card>
  )
}

export default MigrateCard