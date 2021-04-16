import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import BigNumber from 'bignumber.js'

import { ProductPageSection } from './ProductPageLayouts'
import SimpleButton from 'components/SimpleButton'

import useWallet from 'hooks/useWallet'
import { useAddToMetamask } from 'hooks/useAddToMetamask'

interface ProductWalletBalanceProps {
  symbol: 'DPI' | 'MVI' | 'ETH2x-FLI' | 'CGI' | 'INDEX'
  latestPrice?: number
  currentBalance?: BigNumber | number
}

const ProductWalletBalance: React.FC<ProductWalletBalanceProps> = ({
  symbol,
  latestPrice = 0,
  currentBalance = 0,
}) => {
  const { isMetamaskConnected } = useWallet()
  const handleAddToMetamask = useAddToMetamask()

  return (
    <ProductPageSection title='My Assets'>
      <StyledTokenWrapper>
        <div>
          <StyledTokenValuation>
            ${numeral(latestPrice * Number(currentBalance)).format('0.00a')}
          </StyledTokenValuation>
          <StyledTokenBalance>
            {numeral(currentBalance).format('0.000a')} {symbol}
          </StyledTokenBalance>
        </div>
        <div>
          <SimpleButton
            text='Add to Metamask'
            isDisabled={!isMetamaskConnected}
            onClick={() => handleAddToMetamask(symbol)}
          />
        </div>
      </StyledTokenWrapper>
    </ProductPageSection>
  )
}

const StyledTokenWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const StyledTokenValuation = styled.h3`
  display: inline-block;
  margin: 0 ${({ theme }) => theme.spacing[4]}px 0 0;
  font-size: 28px;
`

const StyledTokenBalance = styled.div`
  display: inline-block;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey[500]};
`

export default ProductWalletBalance
