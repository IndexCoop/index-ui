import { useEffect,useState } from 'react'

// CoinGecko ocassionaly throws 429s. We can temporarily mitigate by using
// ONE_INCH_LIST instead however that doesn't contain some recent MVI additions
// (e.g. WHALE)
const COIN_GECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json'
const ONE_INCH_LIST =
  'https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link'

export interface Token {
  address: string
  chainId: number
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

export interface TokenList {
  tokens: Token[]
}

/**
 * Fetch Tokens from tokenlists
 * @link https://tokenlists.org/
 */
export const fetchTokens = async (): Promise<Token[]> => {
  try {
    const res = await fetch(COIN_GECKO_LIST)
    const data: TokenList = await res.json()
    return data?.tokens
  } catch (e) {
    console.error(e)
    return []
  }
}

export function useTokenList() {
  const [tokenList, setTokenList] = useState<Token[]>()

  useEffect(() => {
    fetchTokens().then((data) => {
      setTokenList(data)
    })
  }, [])

  return { tokenList }
}
