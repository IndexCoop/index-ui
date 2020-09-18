import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Spacer,
} from 'react-neu'

import Dial from 'components/Dial'

const Rebase: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Box
          alignItems="center"
          justifyContent="center"
          row
        >
          <Dial size={240} value={0}>
          </Dial>
        </Box>
        <Spacer />
        <Button disabled text="Rebase" variant="secondary" />
      </CardContent>
    </Card>
  )
}

export default Rebase