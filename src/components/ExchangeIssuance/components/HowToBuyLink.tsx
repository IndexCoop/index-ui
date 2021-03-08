import React from 'react'

import styled from 'styled-components'
import useExchangeIssuance from 'hooks/useExchangeIssuance'

const HowToBuyLink: React.FC = () => {
  const { issuanceToken } = useExchangeIssuance()
  if (issuanceToken.toLowerCase() === 'dpi') {
    return (
      <div>
        <br />
        <Link href={'/how-to-buy'}>New to DeFi? Check out our buy guide.</Link>
      </div>
    )
  }

  return null
}

const Link = styled.a`
  text-decoration: none;
  padding-right: 5px;
  color: #a9a7ff;
  display: inline-block;
  font-size: 14px;
`
export default HowToBuyLink
