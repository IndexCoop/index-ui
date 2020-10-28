import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

import InfoSection from './InfoSection'

import useBalances from 'hooks/useBalances'
import useDpiTokenMarketData from 'hooks/useDpiTokenMarketData'

const DpiHoldings: React.FC = () => {
  const { dpiBalance } = useBalances()
  const { latestPrice } = useDpiTokenMarketData()
  console.log('DPI assets', Number(dpiBalance), latestPrice)
  return (
    <InfoSection title='My Assets'>
      <BaseCurrencyDpiValuation>
        ${numeral((latestPrice || 0) * Number(dpiBalance)).format('0.00a')}
      </BaseCurrencyDpiValuation>
      <DpiTokenHoldings>
        {numeral(dpiBalance).format('0.000a')} DPI
      </DpiTokenHoldings>
    </InfoSection>
  )
}

const BaseCurrencyDpiValuation = styled.h3`
  display: inline-block;
  margin: 0 ${({ theme }) => theme.spacing[4]}px 0 0;
  font-size: 28px;
`

const DpiTokenHoldings = styled.div`
  display: inline-block;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey[500]};
`

export default DpiHoldings
