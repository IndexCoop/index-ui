import React from 'react'

import { Box, Spacer } from 'react-neu'

import styled from 'styled-components'

import Label from 'components/Label'
import Value from 'components/Value'

interface FancyValueProps {
  icon?: {
    src: string
    alt: string
  }
  iconComponent?: React.ReactNode
  iconStyles?: any
  link?: string
  label: string
  value: string
}

const FancyValue: React.FC<FancyValueProps> = ({
  icon,
  iconComponent,
  iconStyles,
  link,
  label,
  value,
}) => {
  let tokenIcon

  if (iconComponent) {
    tokenIcon = iconComponent
  } else if (icon) {
    tokenIcon = <StyledIcon src={icon.src} alt={icon.alt} style={iconStyles} />
  }

  if (link) {
    tokenIcon = (
      <a href={link} target='_blank' rel='noopener noreferrer'>
        {tokenIcon}
      </a>
    )
  }

  return (
    <Box alignItems='center' row>
      <Box row justifyContent='center' minWidth={48}>
        {tokenIcon}
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
