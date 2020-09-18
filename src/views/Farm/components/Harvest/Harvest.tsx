import React from 'react'
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

const Harvest: React.FC = () => {
  return (
    <Card>
      <CardIcon>🍠</CardIcon>
      <CardContent>
        <Box
          alignItems="center"
          column
        >
          <Value value="--" />
          <Label text="Unharvested YAMs" />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          disabled
          full
          text="Harvest"
          variant="secondary"
        />
      </CardActions>
    </Card>
  )
}

export default Harvest