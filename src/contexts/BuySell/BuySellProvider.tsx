import React, { useCallback, useEffect, useState } from 'react'

import Web3 from 'web3'
import { provider } from 'web3-core'

import { currencyTokens } from 'constants/currencyTokens'
import {
  BedIndex,
  Bitcoin2xFlexibleLeverageIndex,
  DataIndex,
  DefiPulseIndex,
  Ethereum2xFlexibleLeverageIndex,
  Ethereum2xFLIP,
  GmiIndex,
  IEthereumFLIP,
  IMaticFLIP,
  IndexToken,
  Matic2xFLIP,
  MetaverseIndex,
} from 'constants/productTokens'
import { TransactionStatusType } from 'contexts/TransactionWatcher'
import useBalances from 'hooks/useBalances'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'
import { MAINNET_CHAIN_DATA } from 'utils/connectors'
import { fromWei, waitTransaction } from 'utils/index'
import trackReferral from 'utils/referralApi'
import { getZeroExTradeData } from 'utils/zeroExUtils'

import BuySellContext from './BuySellContext'
import { ZeroExData } from './types'

const BuySellProvider: React.FC = ({ children }) => {
  const [buySellToken, setBuySellToken] = useState<string>('dpi')
  const [isFetchingOrderData, setIsFetchingOrderData] = useState<boolean>(false)
  const [isUserBuying, setIsUserBuying] = useState<boolean>(true)
  const [activeField, setActiveField] = useState<'currency' | 'set'>('currency')
  const [buySellQuantity, setBuySellQuantity] = useState<string>('')
  const [selectedCurrency, setSelectedCurrency] = useState<any>()
  const [zeroExTradeData, setZeroExTradeData] = useState<ZeroExData>()
  const [currencyOptions, setCurrencyOptions] = useState<any[]>([])

  const { onSetTransactionId, onSetTransactionStatus } = useTransactionWatcher()

  const {
    ethBalance,
    wethBalancePolygon,
    dpiBalance,
    dpiBalancePolygon,
    mviBalance,
    mviBalancePolygon,
    bedBalance,
    gmiBalance,
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
    iethFlipBalance,
    maticFlipBalancePolygon,
    imaticFlipBalancePolygon,
  } = useBalances()

  const { account, ethereum, chainId } = useWallet()

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
  if (!isUserBuying && buySellToken === IndexToken.tokenSelector) {
    spendingTokenBalance = fromWei(indexBalance)
  } else if (!isUserBuying && buySellToken === DefiPulseIndex.tokenSelector) {
    spendingTokenBalance = getNetworkedBalance(dpiBalance, dpiBalancePolygon)
  } else if (
    !isUserBuying &&
    buySellToken === Ethereum2xFlexibleLeverageIndex.tokenSelector
  ) {
    spendingTokenBalance = fromWei(ethfliBalance)
  } else if (!isUserBuying && buySellToken === Ethereum2xFLIP.tokenSelector) {
    spendingTokenBalance = fromWei(ethflipBalance)
  } else if (!isUserBuying && buySellToken === IEthereumFLIP.tokenSelector) {
    spendingTokenBalance = fromWei(iethFlipBalance)
  } else if (!isUserBuying && buySellToken === Matic2xFLIP.tokenSelector) {
    spendingTokenBalance = fromWei(maticFlipBalancePolygon)
  } else if (!isUserBuying && buySellToken === IMaticFLIP.tokenSelector) {
    spendingTokenBalance = fromWei(imaticFlipBalancePolygon)
  } else if (
    !isUserBuying &&
    buySellToken === Bitcoin2xFlexibleLeverageIndex.tokenSelector
  ) {
    spendingTokenBalance = fromWei(btcfliBalance)
  } else if (!isUserBuying && buySellToken === MetaverseIndex.tokenSelector) {
    spendingTokenBalance = getNetworkedBalance(mviBalance, mviBalancePolygon)
  } else if (!isUserBuying && buySellToken === BedIndex.tokenSelector) {
    spendingTokenBalance = fromWei(bedBalance)
  } else if (!isUserBuying && buySellToken === GmiIndex.tokenSelector) {
    spendingTokenBalance = fromWei(gmiBalance)
  } else if (!isUserBuying && buySellToken === DataIndex.tokenSelector) {
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

  useEffect(() => {
    if (!buySellQuantity) return

    setIsFetchingOrderData(true)

    const isExactInputTrade = !isUserBuying || activeField === 'currency'

    getZeroExTradeData(
      isExactInputTrade,
      isUserBuying,
      selectedCurrency.label || '',
      buySellToken || '',
      buySellQuantity || '',
      chainId || 1
    ).then((data) => {
      setZeroExTradeData(data)
      setIsFetchingOrderData(false)
    })
  }, [
    isUserBuying,
    selectedCurrency,
    activeField,
    buySellToken,
    buySellQuantity,
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
    if (isUserBuying) {
      onSetActiveField('set')
    }
    setIsUserBuying(!isUserBuying)
  }

  const onSetActiveField = (field: 'currency' | 'set') => {
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
        isUserBuying,
        activeField,
        selectedCurrency,
        spendingTokenBalance,
        zeroExTradeData,
        currencyOptions,
        buySellQuantity,
        onSetBuySellToken: setBuySellToken,
        onToggleIsUserBuying,
        onSetActiveField,
        onSetSelectedCurrency,
        onSetBuySellQuantity,
        onExecuteBuySell,
      }}
    >
      {children}
    </BuySellContext.Provider>
  )
}

export default BuySellProvider
