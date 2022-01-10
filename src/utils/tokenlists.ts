import { MainnetTokens, MaticTokens } from '@indexcoop/tokenlists'

export type { TokenData } from '@indexcoop/tokenlists'

export function getTokenList(chainId: number = 1) {
  switch (chainId) {
    case 137:
      return MaticTokens
    default:
      return MainnetTokens
  }
}
