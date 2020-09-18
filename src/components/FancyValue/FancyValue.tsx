import React from 'react'
import { Box, Spacer } from 'react-neu'
import styled from 'styled-components'

import Label from 'components/Label'
import Value from 'components/Value'

interface FancyValueProps {
  icon: React.ReactNode,
  label: string,
  value: string,
}

const FancyValue: React.FC<FancyValueProps> = ({
  icon,
  label,
  value,
}) => {
  return (
    <Box
      alignItems="center"
      row
    >
      <Box>
        <StyledIcon>{icon}</StyledIcon>
      </Box>
      <Spacer />
      <Box flex={1}>
        <Value value={value} />
        <Label text={label} />
      </Box>
    </Box>
  )
}

const StyledIcon = styled.span.attrs({ role: 'img' })`
  font-size: 32px;
`

export default FancyValue