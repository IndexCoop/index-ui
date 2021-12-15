import { utils } from 'ethers'

import { BigNumber } from '@ethersproject/bignumber'

export function convertToPercentage(bigNumber: BigNumber): string {
  const result = utils.formatUnits(bigNumber, 16)
  return result + '%'
}
