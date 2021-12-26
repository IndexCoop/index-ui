import { BigNumber } from '@ethersproject/bignumber'

import { convertToPercentage } from './ethersBigNumber'

describe('convertBigNumberToPercentage', () => {
  it('should convert 9500000000000000 to 0.95%', () => {
    const input = BigNumber.from('9500000000000000')
    expect(convertToPercentage(input)).toEqual('0.95%')
  })
})
