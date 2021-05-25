import React, { useState, useEffect, useCallback } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'utils/bignumber'
import BuySellContext from './BuySellContext'
import { fetchTokenBuySellData } from 'utils/tokensetsApi'
import useWallet from 'hooks/useWallet'
import useBalances from 'hooks/useBalances'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import { useDebounce } from 'hooks/useDebounce'
import { getUniswapTradeTransaction } from 'uniswap-sdk/uniswap'
import {
  getUniswapTradeType,
  getUniswapCallData,
  getUniswapTransactionOptions,
} from './utils'
import trackReferral from 'utils/referralApi'
import { waitTransaction } from 'utils/index'
import { TransactionStatusType } from 'contexts/TransactionWatcher'
import {
  Bitcoin2xFlexibleLeverageIndex,
  Ethereum2xFlexibleLeverageIndex,
} from 'constants/productTokens'
import { currencyTokens } from 'constants/currencyTokens'
import { UniswapPriceData } from './types'
import { toast } from 'react-toastify'

const BuySellProvider: React.FC = ({ children }) => {
  const [buySellToken, setBuySellToken] = useState<string>('dpi')
  const [isFetchingOrderData, setIsFetchingOrderData] = useState<boolean>(false)
  const [isUserBuying, setIsUserBuying] = useState<boolean>(true)
  const [activeField, setActiveField] = useState<'currency' | 'set'>('currency')
  const [selectedCurrency, setSelectedCurrency] = useState<any>()
  const [currencyQuantity, setCurrencyQuantity] = useState<string>()
  const [tokenQuantity, setTokenQuantity] = useState<string>()
  const [currencyOptions, setCurrencyOptions] = useState<any[]>([])
  const [uniswapData, setUniswapData] = useState<UniswapPriceData>(
    {} as UniswapPriceData
  )

  const { onSetTransactionId, onSetTransactionStatus } = useTransactionWatcher()

  const ETHFLI_SUPPLY_CAP = new BigNumber(
    parseInt(process.env.REACT_APP_ETH2X_FLI_SUPPLY_CAP || '1')
  )

  const BTCFLI_SUPPLY_CAP = new BigNumber(
    parseInt(process.env.REACT_APP_BTC2X_FLI_SUPPLY_CAP || '1')
  )

  const isApproachingSupplyCap = (
    supplyCap: BigNumber,
    totalSupply: BigNumber
  ) => {
    return totalSupply.div(supplyCap).isGreaterThan(0.9)
  }

  const {
    ethBalance,
    dpiBalance,
    cgiBalance,
    mviBalance,
    ethfliBalance,
    btcfliBalance,
    indexBalance,
    daiBalance,
    usdcBalance,
    ethfliTotalSupply,
    btcfliTotalSupply,
  } = useBalances()

  const {
    account,
    ethereum,
  }: { account: string | null | undefined; ethereum: provider } = useWallet()

  useEffect(() => {
    setCurrencyOptions(currencyTokens)
    setSelectedCurrency(currencyTokens[0])
  }, [])

  let spendingTokenTotalSupply = new BigNumber(0)
  let spendingTokenSupplyCap = new BigNumber(0)
  let spendingTokenBalance = new BigNumber(0)
  let spendingTokenSymbol = ''
  if (!isUserBuying && buySellToken === 'index') {
    spendingTokenBalance = indexBalance || new BigNumber(0)
  } else if (!isUserBuying && buySellToken === 'dpi') {
    spendingTokenBalance = dpiBalance || new BigNumber(0)
  } else if (!isUserBuying && buySellToken === 'ethfli') {
    spendingTokenBalance = ethfliBalance || new BigNumber(0)
    spendingTokenTotalSupply = ethfliTotalSupply || new BigNumber(0)
    spendingTokenSupplyCap = ETHFLI_SUPPLY_CAP
    spendingTokenSymbol = Ethereum2xFlexibleLeverageIndex.symbol
  } else if (!isUserBuying && buySellToken === 'btcfli') {
    spendingTokenBalance = btcfliBalance || new BigNumber(0)
    spendingTokenTotalSupply = btcfliTotalSupply || new BigNumber(0)
    spendingTokenSupplyCap = BTCFLI_SUPPLY_CAP
    spendingTokenSymbol = Bitcoin2xFlexibleLeverageIndex.symbol
  } else if (!isUserBuying && buySellToken === 'cgi') {
    spendingTokenBalance = cgiBalance || new BigNumber(0)
  } else if (!isUserBuying && buySellToken === 'mvi') {
    spendingTokenBalance = mviBalance || new BigNumber(0)
  } else if (selectedCurrency?.id === 'wrapped_eth') {
    spendingTokenBalance = ethBalance || new BigNumber(0)
  } else if (selectedCurrency?.id === 'mcd') {
    spendingTokenBalance = daiBalance || new BigNumber(0)
  } else if (selectedCurrency?.id === 'usdc') {
    spendingTokenBalance = usdcBalance || new BigNumber(0)
  }

  const debouncedCurrencyQuantity = useDebounce(currencyQuantity)
  const debouncedTokenQuantity = useDebounce(tokenQuantity)
  const targetTradeQuantity =
    activeField === 'currency'
      ? debouncedCurrencyQuantity
      : debouncedTokenQuantity

  useEffect(() => {
    if (
      !isUserBuying &&
      (buySellToken == 'ethfli' || buySellToken == 'btcfli') &&
      isApproachingSupplyCap(spendingTokenSupplyCap, spendingTokenSupplyCap)
    ) {
      toast.error(
        spendingTokenSymbol +
          ' is within 10% of the supply cap of ' +
          spendingTokenSupplyCap +
          '. Please be aware of possible market premiums when purchasing.',
        {
          toastId: 'fli-supply-cap-warning',
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
    }
    if (!targetTradeQuantity) return

    setIsFetchingOrderData(true)
    fetchTokenBuySellData(
      buySellToken,
      isUserBuying,
      targetTradeQuantity,
      selectedCurrency?.id,
      activeField
    ).then((uniswapData: UniswapPriceData) => {
      setIsFetchingOrderData(false)

      if (!uniswapData) return setUniswapData({} as any)

      setUniswapData(uniswapData)

      // Populate the inactive field with API response
      if (isUserBuying) {
        if (activeField === 'currency') {
          setTokenQuantity(uniswapData.display?.to_quantity)
        } else {
          setCurrencyQuantity(uniswapData.display?.from_quantity)
        }
      } else {
        setCurrencyQuantity(uniswapData.display?.to_quantity)
      }
    })

    return () => {
      toast.dismiss('fli-supply-cap-warning')
    }
  }, [
    isUserBuying,
    selectedCurrency,
    activeField,
    targetTradeQuantity,
    buySellToken,
  ])

  const onExecuteBuySell = useCallback(async () => {
    if (!account || !uniswapData?.amount_in || !selectedCurrency) return

    let requiredBalance = new BigNumber(uniswapData?.amount_in).dividedBy(
      new BigNumber(10).pow(18)
    )

    if (selectedCurrency.id === 'usdc') {
      requiredBalance = new BigNumber(uniswapData?.amount_in || 0).dividedBy(
        new BigNumber(10).pow(6)
      )
    }

    if (spendingTokenBalance?.isLessThan(requiredBalance)) return

    const uniswapTradeType = getUniswapTradeType(
      isUserBuying,
      selectedCurrency.id,
      uniswapData
    )
    const uniswapCallData = getUniswapCallData(
      uniswapTradeType,
      uniswapData,
      account
    )
    const transactionOptions = getUniswapTransactionOptions(
      uniswapTradeType,
      uniswapData,
      account
    )

    if (!uniswapCallData || !transactionOptions) return

    const isSushiswapTrade =
      buySellToken === Bitcoin2xFlexibleLeverageIndex.tokensetsId

    const uniswapTradeTransaction = getUniswapTradeTransaction(
      ethereum,
      uniswapTradeType,
      uniswapCallData,
      transactionOptions,
      isSushiswapTrade
    )

    try {
      onSetTransactionStatus(TransactionStatusType.IS_APPROVING)

      const transactionId = await uniswapTradeTransaction()

      onSetTransactionId(transactionId)
      onSetTransactionStatus(TransactionStatusType.IS_PENDING)

      const isSuccessful = await waitTransaction(ethereum, transactionId)
      const referralCode = window?.localStorage?.getItem('referral') || ''

      if (isSuccessful) {
        onSetTransactionStatus(TransactionStatusType.IS_COMPLETED)
        trackReferral(
          referralCode,
          transactionId as string,
          'COMPLETED',
          selectedCurrency.id,
          buySellToken,
          isUserBuying
        )
      } else {
        onSetTransactionStatus(TransactionStatusType.IS_FAILED)
        trackReferral(
          referralCode,
          transactionId as string,
          'PENDING OR FAILED',
          selectedCurrency.id,
          buySellToken,
          isUserBuying
        )
      }
    } catch (e) {
      onSetTransactionStatus(TransactionStatusType.IS_FAILED)
    }
  }, [
    account,
    isUserBuying,
    uniswapData,
    selectedCurrency,
    buySellToken,
    ethereum,
    onSetTransactionId,
    onSetTransactionStatus,
    spendingTokenBalance,
  ])

  const onToggleIsUserBuying = () => {
    // If the user is switching to sell, ensure `set` field can only be selected.
    if (isUserBuying) {
      onSetActiveField('set')
    }
    setIsUserBuying(!isUserBuying)
  }
  const onSetActiveField = (field: 'currency' | 'set') => setActiveField(field)
  const onSetCurrencyQuantity = (currencyQuantity: string) => {
    setCurrencyQuantity(currencyQuantity)
  }
  const onSetTokenQuantity = (tokenQuantity: string) => {
    setTokenQuantity(tokenQuantity)
  }
  const onSetSelectedCurrency = (currency: any) => {
    setSelectedCurrency(currency)
  }

  return (
    <BuySellContext.Provider
      value={{
        buySellToken,
        isFetchingOrderData,
        isUserBuying,
        activeField,
        selectedCurrency,
        currencyQuantity,
        tokenQuantity,
        currencyOptions,
        spendingTokenBalance,
        uniswapData,
        onSetBuySellToken: setBuySellToken,
        onToggleIsUserBuying,
        onSetActiveField,
        onSetSelectedCurrency,
        onSetCurrencyQuantity,
        onSetTokenQuantity,
        onExecuteBuySell,
      }}
    >
      {children}
    </BuySellContext.Provider>
  )
}

export default BuySellProvider
