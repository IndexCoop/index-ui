import React from 'react'

import numeral from 'numeral'
import { Container, Card, CardContent } from 'react-neu'

import FancyValue from 'components/FancyValue'
import Split from 'components/Split'

import usePrices from 'hooks/usePrices';

const Treasury: React.FC = () => {
  const { totalUSDInFarms, dpiPrice } = usePrices()

  const totalUSDInFarmsValue =
    typeof totalUSDInFarms !== 'undefined'
      ? '$' + numeral(totalUSDInFarms).format('0.00a')
      : '--'

  const dpiPriceValue =
    typeof dpiPrice !== 'undefined' && Number(dpiPrice) > 0
      ? '$' + numeral(dpiPrice).format('0.00a')
      : '--'

  return (
    <Container>
      <Split>
        <Card>
          <CardContent>
            <FancyValue
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
          <CardContent>
            <FancyValue
              icon={{
                src: 'https://index-dao.s3.amazonaws.com/owl.png',
                alt: 'Owl',
              }}
              label='$INDEX Price'
              value={dpiPriceValue}
            />
          </CardContent>
        </Card>
      </Split>
    </Container>
  )
}

export default Treasury
