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
import { DefiPulseIndex, ProductToken } from 'constants/productTokens'
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
            {tokenData.token.symbol == DefiPulseIndex.symbol && (
              <TransakBuySellButton />
            )}
          </div>
        </ProductPageHeader>
        <ProductPageContent>
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
