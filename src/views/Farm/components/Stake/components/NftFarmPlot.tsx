import React from 'react'

import { FarmPlot } from 'constants/v3Farms'

interface NftFarmPlotProps {
  farmName: string
  farmPlot: FarmPlot | undefined
}
/**
 * NftFarmPlot - Displays NFT farm information
 */
const NftFarmPlot: React.FC<NftFarmPlotProps> = ({ farmName, farmPlot }) => {
  const { name, pool, startTime, endTime } = farmPlot || {}

  const farmStartTime = startTime
    ? new Date(startTime * 1000).toDateString()
    : 'Unknown Start Time'
  const farmEndTime = endTime
    ? new Date(endTime * 1000).toDateString()
    : 'Unknown End Time'

  return (
    <div>
      <div>{name}</div>
      <div>Pool: {pool}</div>
      <div>
        {farmStartTime} - {farmEndTime}
      </div>
    </div>
  )
}

export default NftFarmPlot
