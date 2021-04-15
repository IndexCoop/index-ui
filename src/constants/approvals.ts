import BigNumber from 'utils/bignumber'

// One 'f' less than the ethers.constants.MaxUint256
export const minimumRequiredApprovalQuantity = new BigNumber(
  '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
)
