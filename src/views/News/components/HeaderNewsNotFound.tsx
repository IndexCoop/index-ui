import React from 'react'
import styled from 'styled-components'

const HeaderNewsNotFound: React.FC = () => {
  return (
    <StyledCard target='_blank'>
      <StyledCardContent>
        <StyledCardTitle>
          Oops! There's a problem with news we're working on right now!
        </StyledCardTitle>
      </StyledCardContent>
    </StyledCard>
  )
}

const StyledCard = styled.a`
  width: 100%;
  transition: 0.2s;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.primary.light};
  }
`

const StyledCardContent = styled.div`
  height: 100px;
  width: 100%;
`

const StyledCardTitle = styled.p`
  display: block;
  font-size: 32px;
  margin-top: 5px;
  margin-bottom: 10px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`

export default HeaderNewsNotFound
