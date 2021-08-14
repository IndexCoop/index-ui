import React from 'react'

import { FarmPlot } from 'constants/v3Farms'
import styled from 'styled-components'

interface NftFarmPlotProps {
  farmName: string
  farmPlot: FarmPlot | undefined
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

  return (
    <StyledCard>
      <div>TBD</div>
      <div>Pool: {pool}</div>
      <div>
        {farmStartTime} - {farmEndTime}
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
  padding: 15px;
`

export default NftFarmPlot
