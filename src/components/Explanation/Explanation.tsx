import React from 'react'
import { Surface, Separator, Spacer } from 'react-neu'
import styled from 'styled-components'

const Explanation: React.FC = () => (
  <div>
    <StyledExplanationTitle>What is the Index Coop?</StyledExplanationTitle>
    <StyledExplanationContainer>
      <StyledCardContainer>
        <Surface fill>
          <StyledCardContent>
            <StyledCardTitle>Diversified Risk Products</StyledCardTitle>
            <StyledCardDescription>
              Index Coop creates and maintains the world's best crypto index
              products.
            </StyledCardDescription>
          </StyledCardContent>
        </Surface>
      </StyledCardContainer>

      <Spacer />

      <StyledCardContainer>
        <Surface fill>
          <StyledCardContent>
            <StyledCardTitle>Decentralized & Autonomous</StyledCardTitle>
            <StyledCardDescription>
              Index Coop is a Decentralized and Autonomous Asset Manager
              governed, maintained, and upgraded by INDEX token holders.
            </StyledCardDescription>
          </StyledCardContent>
        </Surface>
      </StyledCardContainer>

      <Spacer />

      <StyledCardContainer>
        <Surface fill>
          <StyledCardContent>
            <StyledCardTitle>Backed by DeFi Leaders</StyledCardTitle>
            <StyledCardDescription>
              Backed by the teams at Set Protocol and DeFi Pulse.
            </StyledCardDescription>
          </StyledCardContent>
        </Surface>
      </StyledCardContainer>
    </StyledExplanationContainer>
  </div>
)

const StyledExplanationContainer = styled.div`
  display: flex;
`

const StyledExplanationTitle = styled.h2`
  font-size: 32px;
  font-weight: 500;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.grey};
  padding-bottom: 30px;
  margin-bottom: 30px;
`

const StyledCardContainer = styled.div`
  flex: 1;
`

const StyledCardContent = styled.div`
  padding: 20px;
`

const StyledCardTitle = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin: 0;
`
const StyledCardDescription = styled.p`
  font-size: 24px;
`

export default Explanation
