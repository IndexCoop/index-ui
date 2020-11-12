import React from 'react'
import styled from 'styled-components'
import { Surface } from 'react-neu'

const HeaderNewsCard: React.FC = () => {
  return (
    <Surface fill>
      <StyledCard>
        <StyledCardImage src='https://miro.medium.com/max/1400/1*jGrGl4jcZ_uUQZ3xDM-Ntw.png' />
        <StyledCardContent>
          <StyledCardTitle>
            How to Capture Intrinsic Productivity in an Index Fund
          </StyledCardTitle>
          <StyledCardAuthor>By Over analyser</StyledCardAuthor>
          <StyledReadMore>Read more</StyledReadMore>
        </StyledCardContent>
      </StyledCard>
    </Surface>
  )
}

const StyledCard = styled.div`
  height: 400px;
  width: 100%;
  position: relative;
`

const StyledCardContent = styled.div`
  padding: 20px;
`

const StyledCardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: -1;
`
const StyledCardTitle = styled.h1``
const StyledCardAuthor = styled.h3``
const StyledReadMore = styled.span`
  font-weight: 600;
`

export default HeaderNewsCard
