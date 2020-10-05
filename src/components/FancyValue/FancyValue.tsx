import React from 'react'
import { Box, Spacer } from 'react-neu'
import styled from 'styled-components'

import Label from 'components/Label'
import Value from 'components/Value'

interface FancyValueProps {
  icon: {
    src: string;
    alt: string;
  },
  iconStyles?: any;
  label: string,
  value: string,
}

const FancyValue: React.FC<FancyValueProps> = ({ icon, iconStyles, label, value }) => {
  return (
    <Box alignItems='center' row>
      <Box row justifyContent='center' minWidth={48}>
        <StyledIcon src={icon.src} alt={icon.alt} style={iconStyles} />
      </Box>
      <Spacer size='sm' />
      <Box flex={1}>
        <Value value={value} />
        <Label text={label} />
      </Box>
    </Box>
  )
}

const StyledIcon = styled.img`
  height: 34px;
  text-align: center;
  min-width: 34px;
`

export default FancyValue
