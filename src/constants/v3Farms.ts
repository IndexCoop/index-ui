import { dpiTokenImage } from './productTokens'

export interface V3Farm {
  tokenPair: string
  pool: string
  poolLabel: string
  img: {
    alt: string
    src: string
  }
  farms: FarmData[]
}

export interface FarmData {
  rewardToken: string
  pool: string
  startTime: number
  endTime: number
  refundee: string
  dateText: string
  img: {
    alt: string
    src: string
  }
}

export const DpiEthRewards: V3Farm = {
  tokenPair: 'DPI/ETH',
  pool: '0x9359c87B38DD25192c5f2b07b351ac91C90E6ca7',
  poolLabel: 'DPI-ETH',
  img: {
    alt: 'DPI Icon',
    src: dpiTokenImage,
  },
  farms: [
    // August 20th - September 4th
    {
      rewardToken: '0x0954906da0Bf32d5479e25f46056d22f08464cab',
      pool: '0x9359c87B38DD25192c5f2b07b351ac91C90E6ca7',
      startTime: 1629493200,
      endTime: 1630789200,
      refundee: '0x9467cfADC9DE245010dF95Ec6a585A506A8ad5FC',
      dateText: 'August 20th, 2021 - September 4th, 2021',
      img: {
        alt: 'DPI Icon',
        src: dpiTokenImage,
      },
    },
  ],
}

export const MviEthRewards: V3Farm = {
  tokenPair: 'MVI/ETH',
  pool: '0x06ada8f74d99c6c200672b02e5c3341866ca3bfb',
  poolLabel: 'MVI-ETH',
  img: {
    alt: 'MVI Icon',
    src: 'https://set-core.s3.amazonaws.com/img/portfolios/mvi.svg',
  },
  farms: [
    // August 20th - September 4th
    {
      rewardToken: '0x0954906da0Bf32d5479e25f46056d22f08464cab', //INDEX
      pool: '0x06ada8f74d99c6c200672b02e5c3341866ca3bfb',
      startTime: 1629493200,
      endTime: 1630789200,
      refundee: '0x9467cfADC9DE245010dF95Ec6a585A506A8ad5FC', //Treasury
      dateText: 'November 1st, 2021 - January 1st, 2022',
      img: {
        alt: 'MVI Icon',
        src: 'https://set-core.s3.amazonaws.com/img/portfolios/mvi.svg',
      },
    },
  ],
}

const farms = [DpiEthRewards, MviEthRewards]

export default farms
