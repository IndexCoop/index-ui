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
import TransakBuySellButton from 'components/TransakBuySellButton'
import IndexComponent from 'components/IndexComponent'

import useLocalStorage from 'hooks/useLocalStorage'
import {
  DefiPulseIndex,
  IndexToken,
  ProductToken,
} from 'constants/productTokens'
import BigNumber from 'utils/bignumber'

export interface TokenDataProps {
  prices: number[][] | undefined
  hourlyPrices: number[][] | undefined
  latestPrice: number | undefined
  latestMarketCap: number | undefined
  latestVolume: number | undefined
  token: ProductToken
  components: IndexComponent[] | undefined
  balance: BigNumber | undefined
  supplyCap?: string | number
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
            {tokenData.token.symbol === DefiPulseIndex.symbol && (
              <TransakBuySellButton />
            )}
          </div>
        </ProductPageHeader>
        <ProductPageContent>
          {tokenData.token.symbol !== IndexToken.symbol && (
            <TokenStats
              latestPrice={tokenData.latestPrice}
              latestVolume={tokenData.latestVolume}
              latestMarketCap={tokenData.latestMarketCap}
              fees={tokenData.token.fees}
              netAssetValue={getNetAssetValue()}
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
            <IndexComponentsTable components={tokenData.components} />
          )}
          <Description>{children}</Description>
        </ProductPageContent>
      </Container>
    </Page>
  )
}

export default ProductDataUI
