import { useState, useEffect } from "react";

export interface Token {
  address: string;
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}

export interface TokenList {
  tokens: Token[];
}

/**
 * Fetch Tokens from tokenlists
 * @link https://tokenlists.org/
 */
 export const fetchTokens = async (): Promise<Token[]> => {
  const res = await fetch(
      "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link",
  );
  const data: TokenList = await res.json();
  return data?.tokens;
};

export function useTokenList() {
    const [tokenList, setTokenList] = useState<Token[]>();

    useEffect(() => {
        fetchTokens().then(data => {
            setTokenList(data)
        })
    }, [])

    return {tokenList}
}
