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

export const DPIETH: V3Farm = {
  tokenPair: 'DPI/ETH',
  pool: '0x1cC56b205109A832Fd0F7062FD64bb6813BeF443',
  farms: [
    {
      rewardToken: '0x1720668a1826c6f30a11780783b0357269b7e1ca',
      pool: '0x1cC56b205109A832Fd0F7062FD64bb6813BeF443',
      startTime: 1626120926,
      endTime: 1627673846,
      refundee: '0xf6401adc23Faa6B9AD83eA8604CA7254CB7F53e7',
    },
    {
      rewardToken: '0x1720668a1826c6f30a11780783b0357269b7e1ca',
      pool: '0x1cC56b205109A832Fd0F7062FD64bb6813BeF443',
      startTime: 1628813546,
      endTime: 1629849941,
      refundee: '0xf6401adc23Faa6B9AD83eA8604CA7254CB7F53e7',
    },
  ],
}

export const farmsByFarmName = {
  'DPI-ETH': DPIETH,
}

const farms = [DPIETH]

export default farms
