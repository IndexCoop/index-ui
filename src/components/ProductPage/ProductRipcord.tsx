import React, { ReactNode } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import { InputProps } from 'react-neu'

import SimpleButton from 'components/SimpleButton'
import { ProductPageSection } from './ProductPageLayouts'
import useWallet from 'hooks/useWallet'
import { useRipcord } from 'hooks/useRipcord'
import { TokenDataProps } from './ProductDataUI'
import { Ethereum2xFlexibleLeverageIndex } from 'constants/productTokens'

interface ProductRipcordProps extends InputProps {
  tokenData: TokenDataProps
}

const ProductRipcord: React.FC<ProductRipcordProps> = ({ tokenData }) => {
  const { isMetamaskConnected } = useWallet()
  const Eth2xOrBtc2x = Ethereum2xFlexibleLeverageIndex.symbol
    ? 'eth2x'
    : 'btc2x'

  const handleRipcord = useRipcord(Eth2xOrBtc2x)

  const formatLeverageMetric = (metricValue: number) =>
    numeral(metricValue).format('0.00').toString().toUpperCase()

  const realLeverage =
    tokenData.components && tokenData.components.length > 0
      ? Number(tokenData.components[0].percentOfSet || 0) / 100
      : 2

  const eth2xMaxLeverageRatio = 2.7
  const btc2xMaxLeverageRatio = 2.4

  const maxLeverage =
    Eth2xOrBtc2x === 'eth2x' ? eth2xMaxLeverageRatio : btc2xMaxLeverageRatio

  const renderRealLeverage = (leverage: number) => {
    if (leverage < maxLeverage) {
      return (
        <StyledPositiveChange>
          {formatLeverageMetric(leverage)}x
        </StyledPositiveChange>
      )
    }
    return (
      <StyledNegativeChange>
        {formatLeverageMetric(leverage)}x
      </StyledNegativeChange>
    )
  }

  return (
    <ProductPageSection title='Ripcord'>
      <StyledTokenWrapper>
        <StyledStat>
          <StyledStatTitle>Real Leverage</StyledStatTitle>
          <StyledStatMetric>
            {renderRealLeverage(realLeverage)}
          </StyledStatMetric>
        </StyledStat>
        <StyledStat>
          <StyledStatTitle>Max Leverage</StyledStatTitle>
          <StyledStatMetric>{maxLeverage.toString()}x</StyledStatMetric>
        </StyledStat>
        <div>
          <SimpleButton
            text='Pull Ripcord'
            isDisabled={!isMetamaskConnected}
            onClick={() => handleRipcord()}
          />
          <StyledLinkContainer>
            <StyledLink
              href='https://docs.indexcoop.com/our-products/flexible-leverage-indices/fli-technical-documentation/fli-product-parameters#ripcord-parameters'
              target='_blank'
            >
              Learn More...
            </StyledLink>
          </StyledLinkContainer>
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

const StyledStat = styled.div`
  flex: 1;
  @media (max-width: 480px) {
    align-items: center;
  }
`

const StyledStatTitle = styled.div`
  font-size: 16px;
  @media (max-width: 480px) {
    font-size: 14px;
  }
`

const StyledStatMetric = styled.div`
  font-size: 24px;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`

const StyledLink = styled.a`
  font-size: 10px;
  color: white;
  @media (max-width: 480px) {
    font-size: 8px;
  }
`

const StyledLinkContainer = styled.a`
  display: flex;
  justify-content: flex-end;
`

const StyledNegativeChange = styled.div`
  color: ${({ theme }) => theme.colors.red};
`

const StyledPositiveChange = styled.div`
  color: ${({ theme }) => theme.colors.green};
`

export default ProductRipcord
