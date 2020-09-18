import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Spacer,
} from 'react-neu'

import FancyValue from 'components/FancyValue'

const Stats: React.FC = () => {
  return (
    <Box column>
      <Card>
        <CardContent>
          <FancyValue
            icon="💲"
            label="Current price"
            value="--"
          />
        </CardContent>
      </Card>
      <Spacer />
      <Card>
        <CardContent>
          <FancyValue
            icon="🎯"
            label="Target price"
            value="--"
          />
        </CardContent>
      </Card>
      <Spacer />
      <Card>
        <CardContent>
          <FancyValue
            icon="🚀"
            label="Scaling factor"
            value="--"
          />
        </CardContent>
      </Card>
    </Box>
  )
}

export default Stats