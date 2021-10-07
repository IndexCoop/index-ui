import Web3 from 'web3'
import React, { useState, useEffect, useCallback } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'utils/bignumber'
import BuySellContext from './BuySellContext'
import useWallet from 'hooks/useWallet'
import useBalances from 'hooks/useBalances'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import { getZeroExTradeData } from 'utils/zeroExUtils'
import trackReferral from 'utils/referralApi'
import { waitTransaction } from 'utils/index'
import { TransactionStatusType } from 'contexts/TransactionWatcher'
import { currencyTokens } from 'constants/currencyTokens'
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
    dpiBalance,
    mviBalance,
    bedBalance,
    dataBalance,
    ethfliBalance,
    btcfliBalance,
    indexBalance,
    daiBalance,
    usdcBalance,
  } = useBalances()

  const {
    account,
    ethereum,
  }: { account: string | null | undefined; ethereum: provider } = useWallet()

  useEffect(() => {
    setCurrencyOptions(currencyTokens)
    setSelectedCurrency(currencyTokens[0])
  }, [])

  // eslint-disable-next-line
  let spendingTokenBalance = new BigNumber(0)
  if (!isUserBuying && buySellToken === 'index') {
    spendingTokenBalance = indexBalance || new BigNumber(0)
  } else if (!isUserBuying && buySellToken === 'dpi') {
    spendingTokenBalance = dpiBalance || new BigNumber(0)
  } else if (!isUserBuying && buySellToken === 'ethfli') {
    spendingTokenBalance = ethfliBalance || new BigNumber(0)
  } else if (!isUserBuying && buySellToken === 'btcfli') {
    spendingTokenBalance = btcfliBalance || new BigNumber(0)
  } else if (!isUserBuying && buySellToken === 'mvi') {
    spendingTokenBalance = mviBalance || new BigNumber(0)
  } else if (!isUserBuying && buySellToken === 'bed') {
    spendingTokenBalance = bedBalance || new BigNumber(0)
  } else if (!isUserBuying && buySellToken === 'data') {
    spendingTokenBalance = dataBalance || new BigNumber(0)
  } else if (selectedCurrency?.label === 'ETH') {
    spendingTokenBalance = ethBalance || new BigNumber(0)
  } else if (selectedCurrency?.label === 'DAI') {
    spendingTokenBalance = daiBalance || new BigNumber(0)
  } else if (selectedCurrency?.label === 'USDC') {
    spendingTokenBalance = usdcBalance || new BigNumber(0)
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
      buySellQuantity || ''
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
  ])

  const onExecuteBuySell = useCallback(async () => {
    if (!account || !zeroExTradeData?.sellAmount || !selectedCurrency) return

    let requiredBalance = new BigNumber(zeroExTradeData?.sellAmount).dividedBy(
      new BigNumber(10).pow(18)
    )

    if (selectedCurrency === 'usdc') {
      requiredBalance = new BigNumber(
        zeroExTradeData?.sellAmount || 0
      ).dividedBy(new BigNumber(10).pow(6))
    }

    if (spendingTokenBalance?.isLessThan(requiredBalance)) return

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
