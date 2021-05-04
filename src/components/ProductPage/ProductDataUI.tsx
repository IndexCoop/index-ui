import React, { useEffect } from 'react'
import { Container, InputProps } from 'react-neu'
import styled from 'styled-components'
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

import useLocalStorage from 'hooks/useLocalStorage'
import { ProductToken } from 'constants/productTokens'
import BigNumber from 'utils/bignumber'
import IndexComponent from 'components/IndexComponent'

export interface TokenDataProp {
  prices: number[][]
  hourlyPrices: number[][]
  latestPrice: number
  latestMarketCap: number
  latestVolume: number
  token: ProductToken
  components: IndexComponent[]
  balance: BigNumber
}

interface ProductDataUIProps extends InputProps {
  tokenDataProps: TokenDataProp
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

  return (
    <Page>
      <Container size='lg'>
        <ProductPageHeader>
          <MarketData
            prices={tokenData.prices || [[0]]}
            hourlyPrices={tokenData.hourlyPrices || [[0]]}
            latestPrice={tokenData.latestPrice || 0}
            tokenIcon={{
              src: tokenData.token.image,
              alt: tokenData.token.symbol + ' Logo',
            }}
            tokenSymbol={tokenData.token.symbol}
            title={tokenData.token.name}
          />
          <div>
            <BuySellWrapper tokenId={tokenData.token.tokensetsId} />
            <TransakBuySellButton />
          </div>
        </ProductPageHeader>
        <ProductPageContent>
          <WalletBalance
            symbol={tokenData.token.symbol}
            latestPrice={tokenData.latestPrice}
            currentBalance={tokenData.balance}
          />
          <PriceChanges
            prices={tokenData.prices}
            hourlyPrices={tokenData.hourlyPrices}
          />
          <IndexComponentsTable components={tokenData.components} />
          <TokenStats
            latestPrice={tokenData.latestPrice}
            latestVolume={tokenData.latestVolume}
            latestMarketCap={tokenData.latestMarketCap}
            fees={{
              streamingFee: '0.95%',
            }}
          />
          <Description>{children}</Description>
        </ProductPageContent>
      </Container>
    </Page>
  )
}

export default ProductDataUI
