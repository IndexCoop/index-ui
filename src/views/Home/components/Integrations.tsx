import React from 'react'
import { Surface, Spacer } from 'react-neu'
import styled from 'styled-components'

const Integrations: React.FC = () => (
  <div>
    <StyledIntegrationsTitle>
      Integrated Products & Tools
    </StyledIntegrationsTitle>

    <StyledIntegrationsContainer>
      <StyledCardRow>
        <StyledCardContainer>
          <StyledIntegrationTypeText>
            Call & Put Options
          </StyledIntegrationTypeText>

          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1126715773940948992/unaMO0Vj_400x400.png' />
              <StyledCardTitle>Opyn</StyledCardTitle>
              <StyledCardDescription>
                Index Coop creates and maintains the world's best crypto index
                products.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <StyledIntegrationTypeText>Lend & Borrow</StyledIntegrationTypeText>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_3.svg' />
              <StyledCardTitle>CREAM Finance</StyledCardTitle>
              <StyledCardDescription>
                Our products are built on Set Protocol's battle-tested V2
                infrastructure.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <StyledIntegrationTypeText>Earn Yield</StyledIntegrationTypeText>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_3.svg' />
              <StyledCardTitle>Alpha Homora</StyledCardTitle>
              <StyledCardDescription>
                Our products are built on Set Protocol's battle-tested V2
                infrastructure.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>
      </StyledCardRow>

      <Spacer />

      <StyledCardRow>
        <StyledCardContainer>
          <StyledIntegrationTypeText>Wallets</StyledIntegrationTypeText>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_2.svg' />
              <StyledCardTitle>Argent</StyledCardTitle>
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
              <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_2.svg' />
              <StyledCardTitle>Zerion</StyledCardTitle>
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
              <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_2.svg' />
              <StyledCardTitle>Dharma</StyledCardTitle>
              <StyledCardDescription>
                Index Coop is a Decentralized and Autonomous Asset Manager
                governed, maintained, and upgraded by INDEX token holders.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>
      </StyledCardRow>

      <Spacer />

      <StyledCardRow>
        <StyledCardContainer>
          <StyledIntegrationTypeText>Exchange</StyledIntegrationTypeText>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_3.svg' />
              <StyledCardTitle>Uniswap</StyledCardTitle>
              <StyledCardDescription>
                Our products are built on Set Protocol's battle-tested V2
                infrastructure.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_3.svg' />
              <StyledCardTitle>Balancer</StyledCardTitle>
              <StyledCardDescription>
                Our products are built on Set Protocol's battle-tested V2
                infrastructure.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>
      </StyledCardRow>

      <Spacer />

      <StyledCardRow>
        <StyledCardContainer>
          <StyledIntegrationTypeText>
            Prices & Analytics
          </StyledIntegrationTypeText>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_3.svg' />
              <StyledCardTitle>Dune Analytics</StyledCardTitle>
              <StyledCardDescription>
                Our products are built on Set Protocol's battle-tested V2
                infrastructure.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_3.svg' />
              <StyledCardTitle>Coin Gecko</StyledCardTitle>
              <StyledCardDescription>
                Our products are built on Set Protocol's battle-tested V2
                infrastructure.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_3.svg' />
              <StyledCardTitle>DeFi Pulse</StyledCardTitle>
              <StyledCardDescription>
                Our products are built on Set Protocol's battle-tested V2
                infrastructure.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>
      </StyledCardRow>

      <Spacer />

      <StyledCardContainer>
        <StyledIntegrationTypeText>
          Smart Contract Cover
        </StyledIntegrationTypeText>
        <Surface fill>
          <StyledCardContent>
            <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_3.svg' />
            <StyledCardTitle>Nexus Mutual</StyledCardTitle>
            <StyledCardDescription>
              Our products are built on Set Protocol's battle-tested V2
              infrastructure.
            </StyledCardDescription>
          </StyledCardContent>
        </Surface>
      </StyledCardContainer>

      <Spacer />
    </StyledIntegrationsContainer>
  </div>
)

const StyledIntegrationsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledIntegrationsTitle = styled.h2`
  font-size: 32px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.grey};
  padding-bottom: 30px;
  margin-bottom: 30px;
`

const StyledCardRow = styled.div`
  display: flex;
  align-items: flex-end;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const StyledCardContainer = styled.div`
  width: 30%;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardContent = styled.div`
  padding: 30px;
`

const StyledIntegrationTypeText = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-top: 0;
`

const StyledCardTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`
const StyledCardIcon = styled.img`
  margin-bottom: 20px;
  width: 50px;
  border-radius: 14px;
`

const StyledCardDescription = styled.p`
  font-size: 18px;
`

export default Integrations
