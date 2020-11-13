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
          <StyledIntegrationTypeText>Earn Yield</StyledIntegrationTypeText>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://index-dao.s3.amazonaws.com/owl.png' />
              <StyledCardTitle>Index Coop</StyledCardTitle>
              <StyledCardDescription>
                Earn INDEX tokens be staking Uniswap ETH/DPI LP tokens.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://alphafinance.io/wp-content/uploads//2020/09/Alpha_Logo_02@3x-blue.svg' />
              <StyledCardTitle>Alpha Homora</StyledCardTitle>
              <StyledCardDescription>
                Earn leveraged yield in the ETH/DPI Pool by Alpha Homora.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1302071527630798849/7tGUJFw5_400x400.jpg' />
              <StyledCardTitle>Moonswap</StyledCardTitle>
              <StyledCardDescription>
                Earn leveraged yield in the ETH/DPI Pool by Moonswap
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
              <StyledCardIcon src='https://set-core.s3.amazonaws.com/img/integrations/argent.svg' />
              <StyledCardTitle>Argent</StyledCardTitle>
              <StyledCardDescription>
                Buy & Sell the DeFi Pulse Index natively in the Argent wallet
                app.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://set-core.s3.amazonaws.com/img/integrations/zerion.svg' />
              <StyledCardTitle>Zerion</StyledCardTitle>
              <StyledCardDescription>
                View your portfolio performance and get DeFi Pulse Index in the
                Zerion web app.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1323302938056404993/LA9VzCsY_400x400.jpg' />
              <StyledCardTitle>Dharma</StyledCardTitle>
              <StyledCardDescription>
                Get exposure to DeFi Pulse Index in this easy to use crypto
                wallet.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>
      </StyledCardRow>

      <Spacer />

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
                Buy Put & Call Options for the DeFi Pulse Index.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <StyledIntegrationTypeText>Lend & Borrow</StyledIntegrationTypeText>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1283747298573381633/so8jjWOm_400x400.jpg' />
              <StyledCardTitle>CREAM Finance</StyledCardTitle>
              <StyledCardDescription>
                Lend your DPI for yield, or borrow DPI to hedge.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <StyledIntegrationTypeText>
            Smart Contract Cover
          </StyledIntegrationTypeText>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1004666585292951554/WPfTLP3M_400x400.jpg' />
              <StyledCardTitle>Nexus Mutual</StyledCardTitle>
              <StyledCardDescription>
                Buy Smart Contract Cover for the DeFi Pulse smart contarcts.
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
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1242184851152928769/wG2eTAfD_400x400.jpg' />
              <StyledCardTitle>Uniswap</StyledCardTitle>
              <StyledCardDescription>
                Buy & Sell DeFi Pulse Index and INDEX tokens on crypto's biggest
                DEX.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1174715409100083200/RYCU7_dZ_400x400.png' />
              <StyledCardTitle>Balancer</StyledCardTitle>
              <StyledCardDescription>
                Buy & Sell DeFi Pulse Index.
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
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1127499943114096645/RMWlZ_aT_400x400.png' />
              <StyledCardTitle>Dune Analytics</StyledCardTitle>
              <StyledCardDescription>
                View our dashboard tracking DeFi Pulse Index holders, TVL, and
                volume.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://set-core.s3.amazonaws.com/img/integrations/coingecko.png' />
              <StyledCardTitle>Coin Gecko</StyledCardTitle>
              <StyledCardDescription>
                Compare DeFi Pulse Index with the wider crypto market.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1099721619352768513/QU-2Gqyi_400x400.png' />
              <StyledCardTitle>DeFi Pulse</StyledCardTitle>
              <StyledCardDescription>
                Track DeFi Pulse Index projects on the methodologists site.
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>
      </StyledCardRow>
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
  border-radius: 50%;
`

const StyledCardDescription = styled.p`
  font-size: 18px;
  line-height: 1.5;
`

export default Integrations
