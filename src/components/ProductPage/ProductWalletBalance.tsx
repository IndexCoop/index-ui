import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import BigNumber from 'bignumber.js'

import { ProductPageSection } from './ProductPageLayouts'

interface ProductWalletBalanceProps {
  symbol?: string
  latestPrice?: number
  currentBalance?: BigNumber | number
}

const ProductWalletBalance: React.FC<ProductWalletBalanceProps> = ({
  symbol,
  latestPrice = 0,
  currentBalance = 0,
}) => {
  return (
    <ProductPageSection title='My Assets'>
      <BaseCurrencyDpiValuation>
        ${numeral(latestPrice * Number(currentBalance)).format('0.00a')}
      </BaseCurrencyDpiValuation>
      <DpiTokenHoldings>
        {numeral(currentBalance).format('0.000a')} {symbol}
      </DpiTokenHoldings>
    </ProductPageSection>
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

export default ProductWalletBalance
