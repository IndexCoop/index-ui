import React from 'react'

import numeral from 'numeral'
import { Spacer, Container } from 'react-neu'
import styled from 'styled-components'

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
    typeof dpiPrice !== 'undefined'
      ? '$' + numeral(dpiPrice).format('0.00a')
      : '--'

  return (
    <Container>
      <Split>
        <StyledIndexData>
          <FancyValue
            icon='💰'
            label='Capital in Farms'
            value={totalUSDInFarmsValue}
          />
        </StyledIndexData>
        <StyledIndexData>
          <FancyValue icon='🦉' label='$INDEX Price' value={dpiPriceValue} />
        </StyledIndexData>
      </Split>
      <Spacer />
    </Container>
  )
}

const StyledIndexData = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 100px;
  border-radius: 10px;
  background-color: white;
  color: dark-blue;
`

export default Treasury
