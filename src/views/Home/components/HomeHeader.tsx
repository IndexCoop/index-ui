import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

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

      <HomeHeaderCTA to='/dpi'>View the DeFi Pulse Index</HomeHeaderCTA>
    </div>
  )
}

const HomeTitle = styled.p`
  font-size: 72px;
  line-height: 1.2;
  @media (max-width: 768px) {
    font-size: 36px;
  }
`

const AuvText = styled.span`
  font-size: 72px;
  line-height: 1;
  color: #03c75e;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 36px;
  }
`

const HomeHeaderCTA = styled(NavLink)`
  color: white;
  background-color: #03c75e;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  :hover {
    cursor: pointer;
    background-color: #02bf5a;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
`

export default Home
