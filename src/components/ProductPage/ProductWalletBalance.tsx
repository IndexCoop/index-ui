import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import BigNumber from 'bignumber.js'

import { ProductPageSection } from './ProductPageLayouts'
import SimpleButton from 'components/SimpleButton'

import useWallet from 'hooks/useWallet'
import { useAddToMetamask } from 'hooks/useAddToMetamask'
import { ProductToken } from 'constants/productTokens'
import { displayFromWei } from 'utils'

interface ProductWalletBalanceProps {
  token: ProductToken
  latestPrice?: number
  currentBalance?: string
}

const ProductWalletBalance: React.FC<ProductWalletBalanceProps> = ({
  token,
  latestPrice = 0,
  currentBalance = '0',
}) => {
  const { isMetamaskConnected } = useWallet()
  const handleAddToMetamask = useAddToMetamask()

  return (
    <ProductPageSection title='My Assets'>
      <StyledTokenWrapper>
        <div>
          <StyledTokenValuation>
            $
            {displayFromWei(
              new BigNumber(currentBalance).times(latestPrice).toString()
            )}
          </StyledTokenValuation>
          <StyledTokenBalance data-cy='my-assets-token-balance'>
            {displayFromWei(currentBalance)} {token.symbol}
          </StyledTokenBalance>
        </div>
        <div>
          <SimpleButton
            text='Add to Metamask'
            isDisabled={!isMetamaskConnected}
            onClick={() => handleAddToMetamask(token)}
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
