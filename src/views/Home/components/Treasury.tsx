import React from 'react'

import numeral from 'numeral'
import { Spacer, Container } from 'react-neu'
import styled from 'styled-components'

import FancyValue from 'components/FancyValue'
import Split from 'components/Split'

import useTreasury from 'hooks/useTreasury'

const Treasury: React.FC = () => {
  const { totalYUsdValue, yamBalance } = useTreasury()

  const treasuryValue =
    typeof totalYUsdValue !== 'undefined'
      ? '$' + numeral(totalYUsdValue * 1.15).format('0.00a')
      : '--'

  const yamValue =
    typeof yamBalance !== 'undefined'
      ? numeral(yamBalance).format('0.00a')
      : '--'

  return (
    <Container>
      <Split>
        <StyledIndexData>
          <FancyValue
            icon='💰'
            label='Capital in Farms'
            value={treasuryValue}
          />
        </StyledIndexData>
        <StyledIndexData>
          <FancyValue icon='🦉' label='$INDEX Price' value={yamValue} />
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
