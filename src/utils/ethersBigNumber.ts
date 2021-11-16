import { BigNumber } from '@ethersproject/bignumber'
import { utils } from 'ethers'

export function convertToPercentage(bigNumber: BigNumber): string {
  const result = utils.formatUnits(bigNumber, 16)
  return result + '%'
}
