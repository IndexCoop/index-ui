import React from 'react'
import { Container, useTheme, Button, Spacer } from 'react-neu'
import styled from 'styled-components'
import numeral from 'numeral'
import BigNumber from 'bignumber.js'

import { ProductPageSection } from './ProductPageLayouts'
import { useAddToMetamask } from 'hooks/useAddToMetamask'
import useWallet from 'hooks/useWallet'

interface ProductWalletBalanceProps {
  symbol: string
  latestPrice?: number
  currentBalance?: BigNumber | number
}

const ProductWalletBalance: React.FC<ProductWalletBalanceProps> = ({
  symbol,
  latestPrice = 0,
  currentBalance = 0,
}) => {
  const wallet = useWallet()
  const handleAddToMetamask = useAddToMetamask()

  return (
    <ProductPageSection title='My Assets'>
      <div>
        <StyledTokenValuation>
          ${numeral(latestPrice * Number(currentBalance)).format('0.00a')}
        </StyledTokenValuation>
        <StyledTokenBalance>
          {numeral(currentBalance).format('0.000a')} {symbol}
        </StyledTokenBalance>
      </div>
      <br />
      <AddToMetamask>
        <Button
          full
          size={'sm'}
          text='Add to Metamask'
          variant={'default'}
          disabled={wallet.ethereum == undefined}
          onClick={() => handleAddToMetamask(symbol)}
        />
      </AddToMetamask>
    </ProductPageSection>
  )
}

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

const AddToMetamask = styled.div`
  display: inline-block;
  float: left;
`

export default ProductWalletBalance
