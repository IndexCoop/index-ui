import React from 'react'
import styled from 'styled-components'

import useDpiTokenMarketData from 'hooks/useDpiTokenMarketData'

const Home: React.FC = () => {
  const { latestMarketCap } = useDpiTokenMarketData()

  return (
    <div>
      <HomeTitle>
        The Index Coop currently has{' '}
        <AuvText>
          {latestMarketCap?.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
          })}{' '}
        </AuvText>
        diversified in crypto index products.
      </HomeTitle>

      <HomeHeaderCTA
        href='https://www.tokensets.com/portfolio/dpi'
        target='_blank'
      >
        View the DeFi Pulse Index
      </HomeHeaderCTA>
    </div>
  )
}

const HomeTitle = styled.p`
  font-size: 72px;
  line-height: 1.2;
`

const AuvText = styled.span`
  font-size: 72px;
  line-height: 1;
  color: #03c75e;
  font-weight: 600;
`

const HomeHeaderCTA = styled.a`
  color: white;
  background-color: #03c75e;
  font-size: 24px;
  font-weight: 600;
  text-decoration: none;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  :hover {
    cursor: pointer;
    background-color: #02bf5a;
  }
`

export default Home
