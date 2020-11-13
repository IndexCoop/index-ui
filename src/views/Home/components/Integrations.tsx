import React from 'react'
import { Surface, Spacer } from 'react-neu'
import styled from 'styled-components'

const Integrations: React.FC = () => (
  <div>
    <StyledIntegrationsTitle>
      Integrated Products & Tools
    </StyledIntegrationsTitle>

    <StyledIntegrationsContainer>
      <StyledIntegrationTypeText>Earn Yield</StyledIntegrationTypeText>
      <StyledCardRow>
        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://index-dao.s3.amazonaws.com/owl.png' />
              <StyledCardTitle>Index Coop</StyledCardTitle>
              <StyledCardDescription>
                Earn INDEX tokens be staking Uniswap ETH/DPI LP tokens.
              </StyledCardDescription>

              <StyledOutboundLink href='/farm'>
                View the Pool
              </StyledOutboundLink>
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

              <StyledOutboundLink
                href='https://homora.alphafinance.io/'
                target='_blank'
              >
                View Pools
              </StyledOutboundLink>
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
                Earn yield by providing liquidity to the ETH/DPI Pool by
                Moonswap.
              </StyledCardDescription>

              <StyledOutboundLink
                href='https://farm.moonswap.fi/eth/farms/DPI-ETH%20UNI-V2%20LP'
                target='_blank'
              >
                View the Pool
              </StyledOutboundLink>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>
      </StyledCardRow>

      <Spacer />

      <StyledIntegrationTypeText>Wallets</StyledIntegrationTypeText>

      <StyledCardRow>
        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://set-core.s3.amazonaws.com/img/integrations/zerion.svg' />
              <StyledCardTitle>Zerion</StyledCardTitle>
              <StyledCardDescription>
                Track your portfolio performance and buy DeFi Pulse Index in the
                Zerion app for Desktop, Android & iOS.
              </StyledCardDescription>

              <StyledOutboundLink
                href='https://app.zerion.io/invest/asset/DPI-0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b'
                target='_blank'
              >
                Learn more
              </StyledOutboundLink>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://set-core.s3.amazonaws.com/img/integrations/argent.svg' />
              <StyledCardTitle>Argent</StyledCardTitle>
              <StyledCardDescription>
                Buy & Sell the DeFi Pulse Index natively in the Argent wallet
                app for Android & iOS.
              </StyledCardDescription>

              <StyledOutboundLink
                href='https://www.argent.xyz/'
                target='_blank'
              >
                Learn more
              </StyledOutboundLink>
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
                Get exposure to DeFi Pulse Index with this easy to use crypto
                wallet for Android & iOS.
              </StyledCardDescription>

              <StyledOutboundLink href='https://www.dharma.io/' target='_blank'>
                Learn more
              </StyledOutboundLink>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>
      </StyledCardRow>

      <Spacer />

      <StyledCardRow>
        <StyledFixedCardContainer>
          <StyledIntegrationTypeText>
            Call & Put Options
          </StyledIntegrationTypeText>

          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1126715773940948992/unaMO0Vj_400x400.png' />
              <StyledCardTitle>Opyn</StyledCardTitle>
              <StyledCardDescription>
                Earn premiums or hedge your risk buying and selling Put & Call
                Options on the DeFi Pulse Index.
              </StyledCardDescription>

              <StyledOutboundLink href='https://opyn.co/#/buy' target='_blank'>
                View Prices
              </StyledOutboundLink>
            </StyledCardContent>
          </Surface>
        </StyledFixedCardContainer>

        <Spacer />

        <StyledFixedCardContainer>
          <StyledIntegrationTypeText>Lend & Borrow</StyledIntegrationTypeText>

          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1283747298573381633/so8jjWOm_400x400.jpg' />
              <StyledCardTitle>CREAM Finance</StyledCardTitle>
              <StyledCardDescription>
                Lend your DPI for yield, or borrow DPI to hedge your DeFi
                exposure.
              </StyledCardDescription>

              <StyledOutboundLink
                href='https://app.cream.finance/'
                target='_blank'
              >
                View Lend & Borrow Rates
              </StyledOutboundLink>
            </StyledCardContent>
          </Surface>
        </StyledFixedCardContainer>

        <Spacer />

        <StyledFixedCardContainer>
          <StyledIntegrationTypeText>
            Smart Contract Cover
          </StyledIntegrationTypeText>

          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1004666585292951554/WPfTLP3M_400x400.jpg' />
              <StyledCardTitle>Nexus Mutual</StyledCardTitle>
              <StyledCardDescription>
                Buy Smart Contract Cover for the Set Protocol V2 contracts used
                to power the DeFi Pulse Index.
              </StyledCardDescription>

              <StyledOutboundLink
                href='https://app.nexusmutual.io/cover/buy/get-quote?address=0xa4c8d221d8BB851f83aadd0223a8900A6921A349'
                target='_blank'
              >
                View Coverage Rates
              </StyledOutboundLink>
            </StyledCardContent>
          </Surface>
        </StyledFixedCardContainer>
      </StyledCardRow>

      <Spacer />

      <StyledIntegrationTypeText>Exchange</StyledIntegrationTypeText>

      <StyledCardRow>
        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1242184851152928769/wG2eTAfD_400x400.jpg' />
              <StyledCardTitle>Uniswap</StyledCardTitle>
              <StyledCardDescription>
                Trade DeFi Pulse Index and INDEX tokens on crypto's biggest DEX.
              </StyledCardDescription>

              <StyledOutboundLink
                href='https://info.uniswap.org/token/0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b'
                target='_blank'
              >
                Trade DeFi Pulse Index
              </StyledOutboundLink>

              <StyledOutboundLink
                href='https://uniswap.info/token/0x0954906da0Bf32d5479e25f46056d22f08464cab'
                target='_blank'
              >
                Trade INDEX
              </StyledOutboundLink>
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
                Trade the DeFi Pulse Index on multiple Balancer pools.
              </StyledCardDescription>

              <StyledOutboundLink
                href='https://pools.balancer.exchange/#/explore?type=shared&token=0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b'
                target='_blank'
              >
                Trade DeFi Pulse Index
              </StyledOutboundLink>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>
        <Spacer />

        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1323344385501765632/JOV3GKt4_400x400.jpg' />
              <StyledCardTitle>1inch</StyledCardTitle>
              <StyledCardDescription>
                Trade the DeFi Pulse Index on the 1inch DEX aggregator.
              </StyledCardDescription>

              <StyledOutboundLink
                href='https://1inch.exchange/#/ETH/DPI'
                target='_blank'
              >
                Trade DeFi Pulse Index
              </StyledOutboundLink>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>
      </StyledCardRow>

      <StyledIntegrationTypeText>Prices & Analytics</StyledIntegrationTypeText>

      <StyledCardRow>
        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1127499943114096645/RMWlZ_aT_400x400.png' />
              <StyledCardTitle>Dune Analytics</StyledCardTitle>
              <StyledCardDescription>
                View our dashboard tracking DeFi Pulse Index holders, TVL, and
                total mint & redeem volume.
              </StyledCardDescription>

              <StyledOutboundLink
                href='https://explore.duneanalytics.com/dashboard/index-coop-community'
                target='_blank'
              >
                View Analytics Dashboard
              </StyledOutboundLink>
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
                Track DeFi Pulse Index project rankings.
              </StyledCardDescription>

              <StyledOutboundLink href='https://defipulse.com/' target='_blank'>
                Learn more
              </StyledOutboundLink>
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

              <StyledOutboundLink
                href='https://www.coingecko.com/en/coins/defipulse-index'
                target='_blank'
              >
                View Price Chart
              </StyledOutboundLink>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
              <StyledCardIcon src='https://pbs.twimg.com/profile_images/1323404104517836800/diNpmVhG_400x400.jpg' />
              <StyledCardTitle>CoinMarketCap</StyledCardTitle>
              <StyledCardDescription>
                Compare DeFi Pulse Index with the wider crypto market.
              </StyledCardDescription>

              <StyledOutboundLink
                href='https://coinmarketcap.com/currencies/defi-pulse-index/'
                target='_blank'
              >
                View Price Chart
              </StyledOutboundLink>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>
      </StyledCardRow>

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
  flex-wrap: wrap;
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

const StyledFixedCardContainer = styled.div`
  height: 300px;
  width: 30%;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 60px;
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

const StyledOutboundLink = styled.a`
  display: block;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.primary.light};
  font-weight: 700;
  text-decoration: none;
`

export default Integrations
