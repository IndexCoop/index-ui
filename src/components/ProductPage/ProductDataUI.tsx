import React, { useEffect } from 'react'

import { Container, InputProps } from 'react-neu'
import { useHistory } from 'react-router-dom'

import { BuySellWrapper } from 'components/BuySell'
import BuySellDisabled from 'components/BuySell/BuySellDisabled'
import MarketData from 'components/MarketData'
import Page from 'components/Page'
import {
  IndexComponentsTable,
  PriceChanges,
  ProductPageContent,
  ProductPageHeader,
  TokenStats,
  WalletBalance,
} from 'components/ProductPage'
import { IndexToken, ProductToken } from 'constants/productTokens'
import { SetComponent } from 'contexts/SetComponents/SetComponent'
import useChainData from 'hooks/useChainData'
import useLocalStorage from 'hooks/useLocalStorage'
import BigNumber from 'utils/bignumber'
import { MAINNET_CHAIN_DATA, POLYGON_CHAIN_DATA } from 'utils/connectors'

export interface TokenDataProps {
  prices: number[][] | undefined
  hourlyPrices: number[][] | undefined
  latestPrice: number | undefined
  latestMarketCap: number | undefined
  latestVolume: number | undefined
  token: ProductToken
  components: SetComponent[] | undefined
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
  const { chain } = useChainData()

  useEffect(() => {
    if (value) setReferral(value)
  }, [value, setReferral])

  const netAssetValueReducer = (
    netAssetValue: number,
    component: SetComponent
  ): number => {
    return netAssetValue + (parseFloat(component.totalPriceUsd) || 0)
  }

  const getNetAssetValue = () => {
    return tokenData.components
      ? tokenData.components.reduce(netAssetValueReducer, 0)
      : 0
  }

  /**
   * determines if the token is available on the current chain
   */
  const isAvailableOnCurrentChain = () => {
    return (
      (chain.chainId === POLYGON_CHAIN_DATA.chainId &&
        tokenData.token.polygonAddress &&
        tokenData.token.polygonAddress.length > 0) ||
      (chain.chainId === MAINNET_CHAIN_DATA.chainId &&
        tokenData.token.address &&
        tokenData.token.address.length > 0)
    )
  }

  /**
   * determines whether or not to show BuySellWrapper for current token/chain combo
   * @returns
   */
  const getBuySellWrapper = () => {
    if (isAvailableOnCurrentChain())
      return (
        <div>
          <BuySellWrapper tokenId={tokenData.token.tokensetsId} />
        </div>
      )
    return <BuySellDisabled tokenData={tokenData} />
  }

  return (
    <Page>
      <Container size='lg'>
        <ProductPageHeader>
          <MarketData tokenData={tokenData} />
          {getBuySellWrapper()}
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
            <IndexComponentsTable components={tokenData.components} />
          )}
        </ProductPageContent>
      </Container>
    </Page>
  )
}

export default ProductDataUI
