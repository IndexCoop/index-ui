export interface V3Farm {
  tokenPair: string
  pool: string
  farms: FarmData[]
}

export interface FarmData {
  rewardToken: string
  pool: string
  startTime: number
  endTime: number
  refundee: string
}

export const DpiEthRewards: V3Farm = {
  tokenPair: 'DPI/ETH',
  pool: '0x9359c87B38DD25192c5f2b07b351ac91C90E6ca7',
  farms: [
    // August 20th - September 4th
    {
      rewardToken: '0x0954906da0Bf32d5479e25f46056d22f08464cab',
      pool: '0x9359c87B38DD25192c5f2b07b351ac91C90E6ca7',
      startTime: 1629493200,
      endTime: 1630789200,
      refundee: '0x9467cfADC9DE245010dF95Ec6a585A506A8ad5FC',
    },
  ],
}

const farms = [DpiEthRewards]

export default farms
