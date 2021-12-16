import Web3 from 'web3'
import React, { useRef, useState, useEffect, useCallback } from 'react'

import BigNumber from 'utils/bignumber'
import BuySellContext from './BuySellContext'
import { RequestStatus } from './types'
import useWallet from 'hooks/useWallet'
import useBalances from 'hooks/useBalances'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import {
  convertQuotesToZeroExData,
  getZeroExTradeData,
  getExchangeIssuanceZeroExTradeData,
  ZeroExQuote,
} from 'utils/zeroExUtils'
import useChainData from 'hooks/useChainData'
import trackReferral from 'utils/referralApi'
import { fromWei, waitTransaction } from 'utils/index'
import { TransactionStatusType } from 'contexts/TransactionWatcher'
import { currencyTokens } from 'constants/currencyTokens'
import { ZeroExData } from './types'
import { MAINNET_CHAIN_DATA } from 'utils/connectors'
import {
  exchangeIssuanceTokens,
  exchangeIssuanceChainIds,
} from 'constants/exchangeIssuance'

const BuySellProvider: React.FC = ({ children }) => {
  const { account, ethereum, chainId } = useWallet()
  const { chain } = useChainData()

  const [buySellToken, setBuySellToken] = useState<string>('dpi')
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('none')
  const isFetchingOrderData = requestStatus === 'loading'
  const [isUserBuying, setIsUserBuying] = useState<boolean>(true)
  const [activeField, setActiveField] = useState<'currency' | 'set'>('currency')
  const [buySellQuantity, setBuySellQuantity] = useState<string>('')
  const parsedBuySellQuantity = parseFloat(buySellQuantity)
  const [selectedCurrency, setSelectedCurrency] = useState<any>()
  const [zeroExTradeData, setZeroExTradeData] = useState<ZeroExData>()
  const [currencyOptions, setCurrencyOptions] = useState<any[]>([])

  const isTokenSupportingExchangeIssuance =
    exchangeIssuanceTokens.includes(buySellToken)
  const isChainSupportingExchangeIssuance = exchangeIssuanceChainIds.includes(
    chain.chainId || 0
  )
  const isExchangeIssuanceSupported =
    isTokenSupportingExchangeIssuance && isChainSupportingExchangeIssuance

  const [isUsingExchangeIssuanceSelection, setIsUsingExchangeIssuance] =
    useState<boolean>(false)
  const isUsingExchangeIssuance =
    isUsingExchangeIssuanceSelection && isExchangeIssuanceSupported
  const [exchangeIssuanceQuotes, setExchangeIssuanceQuotes] = useState<
    ZeroExQuote[]
  >([])

  const { onSetTransactionId, onSetTransactionStatus } = useTransactionWatcher()

  // This index is used to stop ongoing useEffect runs that are already replaced by a newer one
  const updateIndex = useRef<number>(0)
  function getUpdateChecker(): () => boolean {
    const currentUpdateIndex = updateIndex.current + 1
    updateIndex.current = currentUpdateIndex
    return () => {
      if (currentUpdateIndex === updateIndex.current) {
        return true
      }
      console.log(
        `UpdateIndex ${currentUpdateIndex} is behind index ${updateIndex.current}`
      )
      return false
    }
  }

  const {
    ethBalance,
    wethBalancePolygon,
    dpiBalance,
    dpiBalancePolygon,
    mviBalance,
    mviBalancePolygon,
    bedBalance,
    dataBalance,
    dataBalancePolygon,
    ethfliBalance,
    ethflipBalance,
    btcfliBalance,
    indexBalance,
    daiBalance,
    daiBalancePolygon,
    usdcBalance,
    usdcBalancePolygon,
  } = useBalances()

  useEffect(() => {
    setCurrencyOptions(currencyTokens)
    setSelectedCurrency(currencyTokens[0])
  }, [])

  const getNetworkedBalance = (
    mainnetBalance: any,
    polygonBalance: any,
    decimals: number = 18
  ) => {
    return chainId && chainId === MAINNET_CHAIN_DATA.chainId
      ? fromWei(mainnetBalance, decimals)
      : fromWei(polygonBalance, decimals)
  }

  // eslint-disable-next-line
  let spendingTokenBalance = new BigNumber(0)
  if (!isUserBuying && buySellToken === 'index') {
    spendingTokenBalance = fromWei(indexBalance)
  } else if (!isUserBuying && buySellToken === 'dpi') {
    spendingTokenBalance = getNetworkedBalance(dpiBalance, dpiBalancePolygon)
  } else if (!isUserBuying && buySellToken === 'ethfli') {
    spendingTokenBalance = fromWei(ethfliBalance)
  } else if (!isUserBuying && buySellToken === 'eth2x-fli-p') {
    spendingTokenBalance = fromWei(ethflipBalance)
  } else if (!isUserBuying && buySellToken === 'btcfli') {
    spendingTokenBalance = fromWei(btcfliBalance)
  } else if (!isUserBuying && buySellToken === 'mvi') {
    spendingTokenBalance = getNetworkedBalance(mviBalance, mviBalancePolygon)
  } else if (!isUserBuying && buySellToken === 'bed') {
    spendingTokenBalance = fromWei(bedBalance)
  } else if (!isUserBuying && buySellToken === 'data') {
    spendingTokenBalance = getNetworkedBalance(dataBalance, dataBalancePolygon)
  } else if (selectedCurrency?.label === 'ETH') {
    spendingTokenBalance = getNetworkedBalance(ethBalance, wethBalancePolygon)
  } else if (selectedCurrency?.label === 'DAI') {
    spendingTokenBalance = getNetworkedBalance(daiBalance, daiBalancePolygon)
  } else if (selectedCurrency?.label === 'USDC') {
    spendingTokenBalance = getNetworkedBalance(
      usdcBalance,
      usdcBalancePolygon,
      6
    )
  }

  async function getUpdatedZeroExData(
    isUsingExchangeIssuance: boolean,
    isUserBuying: boolean,
    isExactInputTrade: boolean,
    isCurrentUpdate: () => boolean,
    selectedCurrencyLabel: string,
    buySellToken: string,
    buySellQuantity: string,
    chainId: number
  ) {
    if (isUsingExchangeIssuance) {
      const quotes = await getExchangeIssuanceZeroExTradeData(
        isUserBuying,
        selectedCurrencyLabel,
        buySellToken,
        buySellQuantity,
        chainId,
        isCurrentUpdate
      )
      if (isCurrentUpdate()) {
        setExchangeIssuanceQuotes(quotes)
        const data = convertQuotesToZeroExData(
          buySellQuantity,
          isUserBuying,
          quotes,
          selectedCurrencyLabel
        )
        return data
      }
    } else {
      return await getZeroExTradeData(
        isExactInputTrade,
        isUserBuying,
        selectedCurrencyLabel,
        buySellToken,
        buySellQuantity,
        chainId
      )
    }
  }

  useEffect(() => {
    if (!(parsedBuySellQuantity > 0)) return
    const isCurrentUpdate = getUpdateChecker()

    setRequestStatus('loading')
    console.log('parsedBuySellQuantity', parsedBuySellQuantity)

    const isExactInputTrade = !isUserBuying || activeField === 'currency'

    getUpdatedZeroExData(
      isUsingExchangeIssuance,
      isUserBuying,
      isExactInputTrade,
      isCurrentUpdate,
      selectedCurrency.label || '',
      buySellToken || '',
      parsedBuySellQuantity.toString() || '',
      chainId || 1
    )
      .then((data) => {
        if (isCurrentUpdate()) {
          setZeroExTradeData(data)
          setRequestStatus('success')
        }
      })
      .catch((error) => {
        console.error('Caught error', error)
        setRequestStatus('failure')
      })
  }, [
    isUserBuying,
    isUsingExchangeIssuance,
    selectedCurrency,
    activeField,
    buySellToken,
    parsedBuySellQuantity,
    chainId,
  ])

  const onExecuteBuySell = useCallback(async () => {
    if (!account || !zeroExTradeData?.sellAmount || !selectedCurrency) return

    let requiredBalance =
      selectedCurrency === 'usdc'
        ? fromWei(new BigNumber(zeroExTradeData.sellAmount), 6)
        : fromWei(new BigNumber(zeroExTradeData?.sellAmount))

    if (spendingTokenBalance.lt(requiredBalance)) return

    const web3 = new Web3(ethereum)

    zeroExTradeData.from = account
    zeroExTradeData.gas = undefined // use metamask estimated gas limit
    try {
      const tx = web3.eth.sendTransaction(zeroExTradeData)
      onSetTransactionStatus(TransactionStatusType.IS_APPROVING)

      const response = await tx

      onSetTransactionId(response.transactionHash)
      onSetTransactionStatus(TransactionStatusType.IS_PENDING)

      const isSuccessful = await waitTransaction(
        ethereum,
        response.transactionHash
      )
      const referralCode = window?.localStorage?.getItem('referral') || ''

      if (isSuccessful) {
        onSetTransactionStatus(TransactionStatusType.IS_COMPLETED)
        trackReferral(
          referralCode,
          response.transactionHash,
          'COMPLETED',
          selectedCurrency,
          buySellToken,
          isUserBuying
        )
      } else {
        onSetTransactionStatus(TransactionStatusType.IS_FAILED)
        trackReferral(
          referralCode,
          response.transactionHash,
          'PENDING OR FAILED',
          selectedCurrency,
          buySellToken,
          isUserBuying
        )
      }
    } catch (e) {
      // There is a problem here where any error that gets triggered will make it seem like
      // the transaction failed. For example, the wallet continually polls the chain but fails
      // to make the network request. The transaction may not have failed, but it would have
      // triggered this error state.
      onSetTransactionStatus(TransactionStatusType.IS_FAILED)
    }
  }, [
    account,
    isUserBuying,
    selectedCurrency,
    buySellToken,
    ethereum,
    onSetTransactionId,
    onSetTransactionStatus,
    spendingTokenBalance,
    zeroExTradeData,
  ])

  const onToggleIsUserBuying = () => {
    // If the user is switching to sell, ensure `set` field can only be selected.
    if (isUserBuying && !isUsingExchangeIssuance) {
      onSetActiveField('set')
    }
    setIsUserBuying(!isUserBuying)
  }

  const onToggleIsUsingExchangeIssuance = () => {
    // If the user is switching to sell, ensure `set` field can only be selected.
    setIsUsingExchangeIssuance(!isUsingExchangeIssuance)
  }

  const onSetActiveField = (field: 'currency' | 'set') => {
    if (isUsingExchangeIssuance) return

    setActiveField(field)

    if (!isUserBuying) return

    // set BuySellQuantity to the correct value
    if (field === 'set') {
      setBuySellQuantity(zeroExTradeData?.displayBuyAmount.toFixed(6) || '')
    } else {
      setBuySellQuantity(zeroExTradeData?.displaySellAmount.toFixed(6) || '')
    }
  }

  const onSetBuySellQuantity = (amount: string) => {
    setBuySellQuantity(amount)
  }

  const onSetSelectedCurrency = (currency: string) => {
    setSelectedCurrency(currency)
  }

  return (
    <BuySellContext.Provider
      value={{
        buySellToken,
        isFetchingOrderData,
        requestStatus,
        isUserBuying,
        isUsingExchangeIssuance,
        isExchangeIssuanceSupported,
        activeField,
        selectedCurrency,
        spendingTokenBalance,
        zeroExTradeData,
        currencyOptions,
        buySellQuantity,
        onSetBuySellToken: setBuySellToken,
        onToggleIsUserBuying,
        onToggleIsUsingExchangeIssuance,
        onSetActiveField,
        onSetSelectedCurrency,
        onSetBuySellQuantity,
        onExecuteBuySell,
        exchangeIssuanceQuotes,
      }}
    >
      {children}
    </BuySellContext.Provider>
  )
}

export default BuySellProvider
