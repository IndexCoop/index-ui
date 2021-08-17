import React from 'react'

import { FarmData } from 'constants/v3Farms'
import styled from 'styled-components'

interface NftFarmPlotProps {
  farmName: string
  farmPlot: FarmData | undefined
}
/**
 * NftFarmPlot - Displays NFT farm information
 */
const NftFarmPlot: React.FC<NftFarmPlotProps> = ({ farmName, farmPlot }) => {
  const { pool, startTime, endTime } = farmPlot || {}

  const farmStartTime = startTime
    ? new Date(startTime * 1000).toDateString()
    : 'Unknown Start Time'
  const farmEndTime = endTime
    ? new Date(endTime * 1000).toDateString()
    : 'Unknown End Time'

  const ethDpiTokenIcon = (
    <StyledLpTokenWrapper>
      <StyledLpTokenImage
        alt='ETH Icon'
        src='https://s3.amazonaws.com/set-core/img/coin-icons/eth.svg'
      />
      <StyledLpTokenImage
        alt='DPI Icon'
        src='https://set-core.s3.amazonaws.com/img/social_trader_set_icons/defi_pulse_index_set.svg'
      />
    </StyledLpTokenWrapper>
  )

  return (
    <StyledCard>
      <StyledFarmTitle>
        {ethDpiTokenIcon} {farmName}
      </StyledFarmTitle>
      <div>Pool ID: {pool}</div>
      <div>
        Active: {farmStartTime} - {farmEndTime}
      </div>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border-radius: 5px;
  background-color: #1a1a26;
  padding: 0 20px 20px;
`

const StyledFarmTitle = styled.h3`
  display: flex;
  align-items: center;
`

const StyledLpTokenWrapper = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`

const StyledLpTokenImage = styled.img`
  height: 35px;
  margin-left: -10px;
`

export default NftFarmPlot
