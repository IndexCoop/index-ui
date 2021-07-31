import React, { ReactNode } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import { InputProps } from 'react-neu'

import SimpleButton from 'components/SimpleButton'
import { ProductPageSection } from './ProductPageLayouts'
import useWallet from 'hooks/useWallet'
import { useRipcord } from 'hooks/useRipcord'
import { TokenDataProps } from './ProductDataUI'
import {
  Bitcoin2xFlexibleLeverageIndex,
  Ethereum2xFlexibleLeverageIndex,
} from 'constants/productTokens'

interface ProductRipcordProps extends InputProps {
  tokenData: TokenDataProps
}

const ProductRipcord: React.FC<ProductRipcordProps> = ({ tokenData }) => {
  const { isMetamaskConnected } = useWallet()
  const handleRipcord = useRipcord()

  const formatLeverageMetric = (metricValue: number) =>
    numeral(metricValue).format('0.00').toString().toUpperCase()

  const realLeverage =
    tokenData.components && tokenData.components.length > 0
      ? Number(tokenData.components[0].percentOfSet || 0) / 100
      : 2

  const maxLeverage = Ethereum2xFlexibleLeverageIndex.symbol ? 2.3 : 2.2

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
        <div>
          <StyledStatTitle>Real Leverage</StyledStatTitle>
          <StyledStatMetric>
            {renderRealLeverage(realLeverage)}
          </StyledStatMetric>
        </div>
        <div>
          <StyledStatTitle>Max Leverage</StyledStatTitle>
          <StyledStatMetric>{maxLeverage.toString()}x</StyledStatMetric>
        </div>
        <div>
          <SimpleButton
            text='Pull Ripcord'
            isDisabled={!isMetamaskConnected || realLeverage < maxLeverage}
            onClick={() => handleRipcord()}
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

const StyledStatTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  @media (max-width: 767px) {
    font-size: 22px;
  }
`

const StyledStatMetric = styled.div`
  font-size: 16px;
  @media (max-width: 767px) {
    font-size: 20px;
    padding-bottom: 10px;
  }
  color: ${({ color }) => color};
`
const StyledIcon = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: grey;
`
const StyledNegativeChange = styled.div`
  color: ${({ theme }) => theme.colors.red};
`

const StyledPositiveChange = styled.div`
  color: ${({ theme }) => theme.colors.green};
`

export default ProductRipcord
