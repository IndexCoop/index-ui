import React from 'react'

import { RoundedButton } from 'components/RoundedButton'
import useBuySell from 'hooks/useBuySell'
import useWallet from 'hooks/useWallet'
import useApproval from 'hooks/useApproval'
import {
  ethTokenAddress,
  zeroExRouterAddress,
} from 'constants/ethContractAddresses'
import { FarmPlot } from 'constants/v3Farms'

interface NftFarmPlotProps {
  farmName: string
  farmPlot: FarmPlot | undefined
}
/**
 * NftFarmPlot - Displays NFT farm information
 */
const NftFarmPlot: React.FC<NftFarmPlotProps> = ({ farmName, farmPlot }) => {
  return (
    <div>
      <div>Farm: {farmName}</div>
      <div>Pool: {farmPlot?.pool}</div>
      <div>
        {farmPlot?.startTime} - {farmPlot?.endTime}
      </div>
    </div>
  )
}

export default NftFarmPlot
