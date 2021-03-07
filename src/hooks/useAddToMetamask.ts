import useWallet from 'hooks/useWallet'

export const useAddToMetamask = () => {
  const wallet = useWallet()

  const tokens: any = {
    DPI: {
      address: '0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b',
      image: 'https://index-dao.s3.amazonaws.com/defi_pulse_index_set.svg',
    },
    CGI: {
      address: '0xada0a1202462085999652dc5310a7a9e2bf3ed42',
      image: '',
    },
    INDEX: {
      address: '0x0954906da0Bf32d5479e25f46056d22f08464cab',
      image: '',
    },
  }

  const addToken = async (symbol: string) => {
    await wallet.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokens[symbol].address,
          symbol: symbol,
          decimals: 18,
          image: tokens[symbol].image,
        },
      },
    })
  }

  return addToken
}
