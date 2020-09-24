import React from 'react'
import { Spacer } from 'react-neu'
import styled from 'styled-components'

const Split: React.FC = ({ children }) => {
  const l = React.Children.toArray(children).length
  return (
    <StyledSplit>
      {React.Children.map(children, (child, i) => (
        <>
          <StyledSplitColumn>
            {child}
          </StyledSplitColumn>
          {i < l - 1 && <Spacer />}
        </>
      ))}
    </StyledSplit>
  )
}

const StyledSplit = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledSplitColumn = styled.div`
  flex: 1;
  @media (max-width: 768px) {
    flex: none;
    width: 100%;
  }
`

export default Split