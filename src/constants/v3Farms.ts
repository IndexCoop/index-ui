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
    // upcoming 3am tomorrow
    // {
    //   rewardToken: '0x1720668a1826c6f30a11780783b0357269b7e1ca',
    //   pool: '0x1cC56b205109A832Fd0F7062FD64bb6813BeF443',
    //   startTime: 1629281495,
    //   endTime: 1629285095,
    //   refundee: '0xf6401adc23Faa6B9AD83eA8604CA7254CB7F53e7',
    // },
    // // acitve until mid august
    // {
    //   rewardToken: '0x1720668a1826c6f30a11780783b0357269b7e1ca',
    //   pool: '0x1cC56b205109A832Fd0F7062FD64bb6813BeF443',
    //   startTime: 1628813546,
    //   endTime: 1629849941,
    //   refundee: '0xf6401adc23Faa6B9AD83eA8604CA7254CB7F53e7',
    // },
    // // active until later tonight
    // {
    //   rewardToken: '0x1720668a1826c6f30a11780783b0357269b7e1ca',
    //   pool: '0x1cC56b205109A832Fd0F7062FD64bb6813BeF443',
    //   startTime: 1629233990,
    //   endTime: 1629259531,
    //   refundee: '0xf6401adc23Faa6B9AD83eA8604CA7254CB7F53e7',
    // },
    // // expired earlier this afternoon 4pm
    {
      rewardToken: '0x1720668a1826c6f30a11780783b0357269b7e1ca',
      pool: '0x1cC56b205109A832Fd0F7062FD64bb6813BeF443',
      startTime: 1629236400,
      endTime: 1629236700,
      refundee: '0xf6401adc23Faa6B9AD83eA8604CA7254CB7F53e7',
    },
  ],
}

export const farmsByFarmName = {
  'DPI-ETH': DPIETH,
}

const farms = [DPIETH]

export default farms
