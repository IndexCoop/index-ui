import React, { useState } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import { NavLink } from 'react-router-dom'
import { Button, Card, CardContent, Spacer } from 'react-neu'

import FancyValue from 'components/FancyValue'
import Split from 'components/Split'
import SimplePriceChart from 'components/SimplePriceChart'

import { productTokensBySymbol } from 'constants/productTokens'
import useAllProductsMarketData from 'hooks/useAllProductsMarketData'
import { PriceChartRangeOption } from 'constants/priceChartEnums'

const MarketData: React.FC = () => {
  const allMarketData = useAllProductsMarketData()

  const [indexSelector, setIndexSelector] = useState<number>(0)
  const [productMetaData, setProductMetaData] = useState<{
    name: string
    symbol: string
    image: string
    url: string
  }>({
    name: productTokensBySymbol.DPI.name,
    symbol: productTokensBySymbol.DPI.symbol,
    image: productTokensBySymbol.DPI.image,
    url: '/dpi',
  })

  const priceAtEpochStart =
    allMarketData[indexSelector].prices?.slice(
      -PriceChartRangeOption.MONTHLY_PRICE_RANGE
    )[0]?.[1] || 1
  const epochPriceChange =
    (allMarketData[indexSelector].latestPrice || 0) - priceAtEpochStart

  const handleDpiButton = () => {
    setIndexSelector(0)
    setProductMetaData({
      name: productTokensBySymbol.DPI.name,
      symbol: productTokensBySymbol.DPI.symbol,
      image: productTokensBySymbol.DPI.image,
      url: '/dpi',
    })
  }

  const handleEthFliButton = () => {
    setIndexSelector(1)
    setProductMetaData({
      name: productTokensBySymbol['ETH2x-FLI'].name,
      symbol: productTokensBySymbol['ETH2x-FLI'].symbol,
      image: productTokensBySymbol['ETH2x-FLI'].image,
      url: '/ethfli',
    })
  }

  const handleMviButton = () => {
    setIndexSelector(2)
    setProductMetaData({
      name: productTokensBySymbol.MVI.name,
      symbol: productTokensBySymbol.MVI.symbol,
      image: productTokensBySymbol.MVI.image,
      url: '/mvi',
    })
  }

  const handleBtcFliButton = () => {
    setIndexSelector(3)
    setProductMetaData({
      name: productTokensBySymbol['BTC2x-FLI'].name,
      symbol: productTokensBySymbol['BTC2x-FLI'].symbol,
      image: productTokensBySymbol['BTC2x-FLI'].image,
      url: '/btcfli',
    })
  }

  const handleBedButton = () => {
    setIndexSelector(4)
    setProductMetaData({
      name: productTokensBySymbol['BED'].name,
      symbol: productTokensBySymbol['BED'].symbol,
      image: productTokensBySymbol['BED'].image,
      url: '/bed',
    })
  }
  return (
    <>
      <StyledMarketDataTitle>Products</StyledMarketDataTitle>
      <ButtonWrapper>
        <Button
          full
          size={'sm'}
          text='DPI'
          variant={indexSelector === 0 ? 'default' : 'secondary'}
          onClick={handleDpiButton}
        />
        <Spacer size={'sm'} />
        <Button
          full
          size={'sm'}
          text='ETH2x-FLI'
          variant={indexSelector === 1 ? 'default' : 'secondary'}
          onClick={handleEthFliButton}
        />
        <Spacer size={'sm'} />
        <Button
          full
          size={'sm'}
          text='MVI'
          variant={indexSelector === 2 ? 'default' : 'secondary'}
          onClick={handleMviButton}
        />
        <Spacer size={'sm'} />
        <Button
          full
          size={'sm'}
          text='BTC2x-FLI'
          variant={indexSelector === 3 ? 'default' : 'secondary'}
          onClick={handleBtcFliButton}
        />
        <Spacer size={'sm'} />
        <Button
          full
          size={'sm'}
          text='BED'
          variant={indexSelector === 4 ? 'default' : 'secondary'}
          onClick={handleBedButton}
        />
      </ButtonWrapper>
      <Card>
        <CardContent>
          <StyledDpiSplitHeader>
            <div>
              <StyledDpiIconLabel>
                <StyledIcon
                  src={productMetaData.image}
                  alt={productMetaData.symbol + ' Logo'}
                />
                <span>{productMetaData.symbol}</span>
              </StyledDpiIconLabel>
              <StyledDpiTitle>{productMetaData.name}</StyledDpiTitle>
            </div>
            <StyledViewMoreButton to={productMetaData.url}>
              View the {productMetaData.name} ➔
            </StyledViewMoreButton>
          </StyledDpiSplitHeader>
        </CardContent>
        <SimplePriceChart
          showTooltip
          icon={{
            src: productMetaData.image,
            alt: productMetaData.symbol + ' Logo',
          }}
          data={allMarketData[indexSelector].prices?.map(([x, y]) => ({
            x,
            y,
          }))}
          hourlyData={allMarketData[indexSelector].hourlyPrices?.map(
            ([x, y]) => ({ x, y })
          )}
        />
      </Card>
      <Spacer />
      <Split>
        <Card>
          <CardContent>
            <FancyValue
              icon={{
                src: productMetaData.image,
                alt: productMetaData.symbol + ' Logo',
              }}
              label={'Current $' + productMetaData.symbol + ' Price'}
              value={
                '$' +
                numeral(allMarketData[indexSelector].latestPrice).format(
                  '0.00a'
                )
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <FancyValue
              icon={{
                src: productMetaData.image,
                alt: productMetaData.symbol + ' Logo',
              }}
              label='1 Month Price Change'
              value={
                numeral((epochPriceChange / priceAtEpochStart) * 100).format(
                  '0.00a'
                ) + '%'
              }
            />
          </CardContent>
        </Card>
      </Split>
      <Spacer />
      <Split>
        <Card>
          <CardContent>
            <FancyValue
              icon={{
                src: productMetaData.image,
                alt: productMetaData.symbol + ' Logo',
              }}
              label={'$' + productMetaData.symbol + ' 24hr Volume'}
              value={
                '$' +
                numeral(allMarketData[indexSelector].latestVolume).format(
                  '0.00a'
                )
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <FancyValue
              icon={{
                src: productMetaData.image,
                alt: productMetaData.symbol + ' Logo',
              }}
              label={'$' + productMetaData.symbol + ' Marketcap'}
              value={
                '$' +
                numeral(allMarketData[indexSelector].latestMarketCap).format(
                  '0.00a'
                )
              }
            />
          </CardContent>
        </Card>
      </Split>
      <Spacer size='lg' />
    </>
  )
}

const StyledMarketDataTitle = styled.h2`
  font-size: 32px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.grey};
  padding-bottom: 30px;
  margin-bottom: 30px;
`

const StyledDpiSplitHeader = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`

const StyledDpiTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
`

const StyledDpiIconLabel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const StyledViewMoreButton = styled(NavLink)`
  height: 24px;
  color: ${(props) => props.theme.colors.grey[500]};
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
`

const StyledIcon = styled.img`
  height: 34px;
  text-align: center;
  min-width: 34px;
  margin-right: 5px;
`

const ButtonWrapper = styled.div`
  display: flex;
  padding-bottom: 20px;
`

export default MarketData
