import React from 'react'

import styled from 'styled-components'
import useBuySell from 'hooks/useBuySell'

const HowToBuyLink: React.FC = () => {
  const { buySellToken } = useBuySell()
  if (buySellToken.toLowerCase() == 'dpi') {
    return (
      <div>
        <br />
        <Link href={'/how-to-buy'}>How to Buy</Link>
      </div>
    )
  } else {
    return <></>
  }
}

const Link = styled.a`
  text-decoration: none;
  padding-right: 5px;
  color: #a9a7ff;
  display: inline-block;
`

export default HowToBuyLink
