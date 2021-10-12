import React, { useEffect } from 'react'
import { Container, InputProps } from 'react-neu'
import { useHistory } from 'react-router-dom'
import Page from 'components/Page'
import {
  ProductPageHeader,
  ProductPageContent,
  TokenStats,
  PriceChanges,
  WalletBalance,
  Description,
  IndexComponentsTable,
} from 'components/ProductPage'
import { BuySellWrapper } from 'components/BuySell'
import MarketData from 'components/MarketData'
import IndexComponent from 'components/IndexComponent'

import useLocalStorage from 'hooks/useLocalStorage'
import {
  DefiPulseIndex,
  IndexToken,
  ProductToken,
} from 'constants/productTokens'
import BigNumber from 'utils/bignumber'
import { SetComponent } from "../../contexts/SetComponents/SetComponent"

export interface TokenDataProps {
  prices: number[][] | undefined
  hourlyPrices: number[][] | undefined
  latestPrice: number | undefined
  latestMarketCap: number | undefined
  latestVolume: number | undefined
  token: ProductToken
  components: IndexComponent[] | undefined
  /**
   * setComponents is a subset of information in components. If provided, it
   * will be used to populate the index token allocation table. If undefined,
   * components will be used instead.
   */
  setComponents?: SetComponent[]
  balance: BigNumber | undefined
  supplyCap?: BigNumber | undefined
  currentSupply?: BigNumber | undefined
}

interface ProductDataUIProps extends InputProps {
  tokenDataProps: TokenDataProps
}

const ProductDataUI: React.FC<ProductDataUIProps> = ({
  tokenDataProps,
  children,
}) => {
  const tokenData = tokenDataProps

  const [, setReferral] = useLocalStorage('referral', '')

  const history = useHistory()
  const params = new URLSearchParams(history.location.search)
  const value = params.get('referral')
  useEffect(() => {
    if (value) setReferral(value)
  }, [value, setReferral])

  const netAssetValueReducer = (
    netAssetValue: number,
    component: IndexComponent
  ): number => {
    return netAssetValue + (parseFloat(component.totalPriceUsd) || 0)
  }

  const getNetAssetValue = () => {
    return tokenData.components
      ? tokenData.components.reduce(netAssetValueReducer, 0)
      : 0
  }

  return (
    <Page>
      <Container size='lg'>
        <ProductPageHeader>
          <MarketData tokenData={tokenData} />
          <div>
            <BuySellWrapper tokenId={tokenData.token.tokensetsId} />
          </div>
        </ProductPageHeader>
        <ProductPageContent>
          {tokenData.token.symbol !== IndexToken.symbol && (
            <TokenStats
              latestVolume={tokenData.latestVolume}
              latestMarketCap={tokenData.latestMarketCap}
              fees={tokenData.token.fees}
              supplyCap={tokenData.supplyCap}
              netAssetValue={getNetAssetValue()}
              currentSupply={tokenData.currentSupply}
            />
          )}
          <WalletBalance
            token={tokenData.token}
            latestPrice={tokenData.latestPrice}
            currentBalance={tokenData.balance}
          />
          <PriceChanges
            prices={tokenData.prices}
            hourlyPrices={tokenData.hourlyPrices}
          />
          {tokenData.components && (
            <IndexComponentsTable indexComponents={tokenData.components} setComponents={tokenData.setComponents}/>
          )}
          <Description>{children}</Description>
        </ProductPageContent>
      </Container>
    </Page>
  )
}

export default ProductDataUI
