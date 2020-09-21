import React from 'react'

import styled from 'styled-components'

interface ValueProps {
  value: string,
}

const Value: React.FC<ValueProps> = ({ value }) => {
  return (
    <StyledValue>{value}</StyledValue>
  )
}

const StyledValue = styled.div`
  color: ${props => props.theme.textColor};
  font-size: 36px;
  font-weight: 700;
`

export default Value