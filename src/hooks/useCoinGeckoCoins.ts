import CoinGecko from 'coingecko-api'
import { useState, useEffect } from 'react'

const CoinGeckoClient = new CoinGecko()

export interface CoinGeckoCoin {
  id: string
  symbol: string
  name: string
}

export const fetchTokens = async (): Promise<CoinGeckoCoin[]> => {
  try {
    // Use as any until the following GitHub issue is resolved
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/57106
    const result = await (CoinGeckoClient.coins as any).list()
    console.log(result);
    return result?.data
  } catch (e) {
    console.error(`Failed to fetch CoinGecko tokens. ${e}`)
    return []
  }
}

export function useCoinGeckoCoins() {
  const [coinList, setCoinList] = useState<CoinGeckoCoin[]>()

  useEffect(() => {
    fetchTokens().then((data) => {
      setCoinList(data)
    })
  }, [])

  return { coinList }
}
