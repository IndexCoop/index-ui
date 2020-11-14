import React from 'react'
import { Surface, Spacer } from 'react-neu'
import styled from 'styled-components'

const Explanation: React.FC = () => (
  <div>
    <StyledExplanationTitle>What is the Index Coop?</StyledExplanationTitle>
    <StyledExplanationContainer>
      <StyledCardContainer>
        <Surface fill>
          <StyledCardContent>
            <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_1.svg' />
            <StyledCardTitle>Diversified Risk Products</StyledCardTitle>
            <StyledCardDescription>
              Index Coop creates and maintains the world's best crypto index
              products.
            </StyledCardDescription>
            <StyledCardDescription>
              All index products are always fully collateralized.
            </StyledCardDescription>
          </StyledCardContent>
        </Surface>
      </StyledCardContainer>

      <Spacer />

      <StyledCardContainer>
        <Surface fill>
          <StyledCardContent>
            <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_2.svg' />
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
            <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_3.svg' />
            <StyledCardTitle>Built with DeFi Leaders</StyledCardTitle>
            <StyledCardDescription>
              Our products are built on Set Protocol's battle-tested V2
              infrastructure.
            </StyledCardDescription>
            <StyledCardDescription>
              Product methodologies are sourced from industry experts like DeFi
              Pulse.
            </StyledCardDescription>
          </StyledCardContent>
        </Surface>
      </StyledCardContainer>
    </StyledExplanationContainer>
  </div>
)

const StyledExplanationContainer = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const StyledExplanationTitle = styled.h2`
  font-size: 32px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.grey};
  padding-bottom: 30px;
  margin-bottom: 30px;
`

const StyledCardContainer = styled.div`
  flex: 1;
`

const StyledCardContent = styled.div`
  padding: 30px;
`

const StyledCardTitle = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin: 0;
`
const StyledCardIcon = styled.img`
  margin-bottom: 20px;
  width: 50px;
`

const StyledCardDescription = styled.p`
  font-size: 24px;
`

export default Explanation
