import React from 'react'

import { Card, CardContent, Container } from 'react-neu'

import numeral from 'numeral'

import indexToken from 'assets/index-token.png'
import FancyValue from 'components/FancyValue'
import Split from 'components/Split'
import usePrices from 'hooks/usePrices'

const Treasury: React.FC = () => {
  const { totalUSDInFarms, indexPrice } = usePrices()

  const totalUSDInFarmsValue =
    typeof totalUSDInFarms !== 'undefined'
      ? '$' + numeral(totalUSDInFarms).format('0.00a')
      : '--'

  const indexPriceValue =
    typeof indexPrice !== 'undefined' && Number(indexPrice) > 0
      ? '$' + numeral(indexPrice).format('0.00a')
      : '--'

  return (
    <Container data-cy='container'>
      <Split data-cy='split'>
        <Card data-cy='capital-in-farms'>
          <CardContent data-cy='card-content'>
            <FancyValue
              data-cy='fancy-value'
              icon={{
                src: 'https://index-dao.s3.amazonaws.com/money.png',
                alt: 'Money',
              }}
              label='Capital in Farms'
              value={totalUSDInFarmsValue}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent data-cy='treasury-index-price'>
            <FancyValue
              icon={{
                src: indexToken,
                alt: 'Index token',
              }}
              label='$INDEX Price'
              value={indexPriceValue}
            />
          </CardContent>
        </Card>
      </Split>
    </Container>
  )
}

export default Treasury
