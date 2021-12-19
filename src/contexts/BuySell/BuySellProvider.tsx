import Web3 from 'web3'
import React, { useRef, useState, useEffect, useCallback } from 'react'

import BigNumber from 'utils/bignumber'
import BuySellContext from './BuySellContext'
import { RequestStatus } from './types'
import useWallet from 'hooks/useWallet'
import useBalances from 'hooks/useBalances'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import { sleep } from 'utils'
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
import { tokenInfo, polygonTokenInfo } from 'constants/tokenInfo'
import { ZeroExData } from './types'
import { POLYGON_CHAIN_DATA } from 'utils/connectors'
import {
  exchangeIssuanceTokens,
  exchangeIssuanceChainIds,
} from 'constants/exchangeIssuance'
import {
  issueExactSetFromETH,
  issueExactSetFromToken,
  redeemExactSetForETH,
  redeemExactSetForToken,
  parseQuotes,
} from 'index-sdk/exchangeIssuance'
import { ethers } from 'ethers'

const REQUEST_DELAY = 500

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
    Record<string, ZeroExQuote>
  >({})

  const { onSetTransactionId, onSetTransactionStatus } = useTransactionWatcher()

  const tokenMapping =
    chain.chainId === POLYGON_CHAIN_DATA.chainId ? polygonTokenInfo : tokenInfo

  const sellTokenName = isUserBuying ? selectedCurrency?.label : buySellToken
  const sellTokenAddress = tokenMapping[sellTokenName]?.address
  const sellTokenDecimals = tokenInfo[sellTokenName]?.decimals

  const buyTokenName = isUserBuying ? buySellToken : selectedCurrency?.label
  const buyTokenAddress = tokenMapping[buyTokenName]?.address

  // This index is used to stop ongoing useEffect runs that are already replaced by a newer one
  const updateIndex = useRef<number>(0)
  function getUpdateChecker(): () => boolean {
    const currentUpdateIndex = updateIndex.current + 1
    updateIndex.current = currentUpdateIndex
    return () => {
      if (currentUpdateIndex === updateIndex.current) {
        return true
      }
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
    return chainId && chainId === POLYGON_CHAIN_DATA.chainId
      ? fromWei(polygonBalance, decimals)
      : fromWei(mainnetBalance, decimals)
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

  const getUpdatedZeroExData = useCallback(
    async function (
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
            selectedCurrencyLabel,
            selectedCurrency.address
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
    },
    [selectedCurrency]
  )

  function isInsufficientLiquidity(response: any): boolean {
    return (
      response?.data?.validationErrors?.find(
        (validationError: any) =>
          validationError?.reason === 'INSUFFICIENT_ASSET_LIQUIDITY'
      ) !== undefined
    )
  }

  useEffect(() => {
    if (!(parsedBuySellQuantity > 0)) return
    const isCurrentUpdate = getUpdateChecker()
    setRequestStatus('loading')
    setZeroExTradeData(undefined)
    sleep(REQUEST_DELAY)
    if (!isCurrentUpdate()) return


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
        console.error('Caught error', error.response)
        setRequestStatus('failure')
        if (isInsufficientLiquidity(error?.response)) {
          setRequestStatus('insufficientLiquidity')
        }
      })
  }, [
    getUpdatedZeroExData,
    isUserBuying,
    isUsingExchangeIssuance,
    selectedCurrency,
    activeField,
    buySellToken,
    parsedBuySellQuantity,
    chainId,
  ])

  const executeTokenSwap = useCallback(
    async function (web3: Web3) {
      if (!zeroExTradeData) return
      zeroExTradeData.from = account || ''
      zeroExTradeData.gas = undefined // use metamask estimated gas limit
      return web3.eth.sendTransaction(zeroExTradeData)
    },
    [zeroExTradeData, account]
  )

  const executeExchangeIssuance = useCallback(
    async function (web3: Web3) {
      if (!zeroExTradeData || !(Object.keys(exchangeIssuanceQuotes).length > 0))
        return
      const setTokenAddress = isUserBuying ? buyTokenAddress : sellTokenAddress
      const exchangeIssuanceQuotesParsed = await parseQuotes(
        exchangeIssuanceQuotes,
        setTokenAddress,
        web3.currentProvider
      )
      if (isUserBuying) {
        if (selectedCurrency.label !== 'ETH') {
          return issueExactSetFromToken(
            web3.currentProvider,
            account || '',
            setTokenAddress,
            sellTokenAddress,
            new BigNumber(ethers.utils.parseEther(buySellQuantity).toString()),
            zeroExTradeData.maxInput.multipliedBy(10 ** sellTokenDecimals),
            exchangeIssuanceQuotesParsed
          )
        } else {
          return issueExactSetFromETH(
            web3.currentProvider,
            account || '',
            setTokenAddress,
            new BigNumber(ethers.utils.parseEther(buySellQuantity).toString()),
            zeroExTradeData.maxInput.multipliedBy(10 ** sellTokenDecimals),
            exchangeIssuanceQuotesParsed
          )
        }
      }
      else {
        if (selectedCurrency.label !== 'ETH') {
          return redeemExactSetForToken(
            web3.currentProvider,
            account || '',
            setTokenAddress,
            buyTokenAddress,
            new BigNumber(ethers.utils.parseEther(buySellQuantity).toString()),
            zeroExTradeData.minOutput.multipliedBy(10 ** sellTokenDecimals),
            exchangeIssuanceQuotesParsed
          )
        } else {
          return redeemExactSetForETH(
            web3.currentProvider,
            account || '',
            setTokenAddress,
            new BigNumber(ethers.utils.parseEther(buySellQuantity).toString()),
            zeroExTradeData.minOutput.multipliedBy(10 ** sellTokenDecimals),
            exchangeIssuanceQuotesParsed
          )
        }
      }
    },
    [
      buySellQuantity,
      exchangeIssuanceQuotes,
      selectedCurrency,
      sellTokenDecimals,
      zeroExTradeData,
      account,
      buyTokenAddress,
      sellTokenAddress,
      isUserBuying,
    ]
  )

  const executeTrade = useCallback(
    async (web3: Web3) => {
      let tx
      if (isUsingExchangeIssuance) {
        tx = executeExchangeIssuance(web3)
      } else {
        tx = executeTokenSwap(web3)
      }

      onSetTransactionStatus(TransactionStatusType.IS_APPROVING)

      const response = await tx

      if (!response) {
        onSetTransactionStatus(TransactionStatusType.IS_FAILED)
        return
      }

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
    },
    [
      buySellToken,
      ethereum,
      onSetTransactionId,
      onSetTransactionStatus,
      isUserBuying,
      executeTokenSwap,
      executeExchangeIssuance,
      isUsingExchangeIssuance,
      selectedCurrency,
    ]
  )

  const onExecuteBuySell = useCallback(async () => {
    if (!account || !zeroExTradeData?.sellAmount || !selectedCurrency) return

    let requiredBalance =
      selectedCurrency === 'usdc'
        ? fromWei(new BigNumber(zeroExTradeData.sellAmount), 6)
        : fromWei(new BigNumber(zeroExTradeData?.sellAmount))

    if (spendingTokenBalance.lt(requiredBalance)) return

    const web3 = new Web3(ethereum)

    try {
      await executeTrade(web3)
    } catch (e) {
      // There is a problem here where any error that gets triggered will make it seem like
      // the transaction failed. For example, the wallet continually polls the chain but fails
      // to make the network request. The transaction may not have failed, but it would have
      // triggered this error state.
      console.error('Caught error', e)
      onSetTransactionStatus(TransactionStatusType.IS_FAILED)
    }
  }, [
    account,
    selectedCurrency,
    ethereum,
    onSetTransactionStatus,
    spendingTokenBalance,
    zeroExTradeData,
    executeTrade,
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
        sellTokenAddress,
      }}
    >
      {children}
    </BuySellContext.Provider>
  )
}

export default BuySellProvider
