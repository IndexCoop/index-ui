import Web3 from 'web3'
import React, { useState, useEffect, useCallback } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'utils/bignumber'
import BuySellContext from './BuySellContext'
import useWallet from 'hooks/useWallet'
import useBalances from 'hooks/useBalances'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import { getZeroExTradeData } from './utils'
import trackReferral from 'utils/referralApi'
import { waitTransaction } from 'utils/index'
import { TransactionStatusType } from 'contexts/TransactionWatcher'
import { currencyTokens } from 'constants/currencyTokens'
import { tokenInfo } from 'constants/tokenInfo'

const BuySellProvider: React.FC = ({ children }) => {
  const [buySellToken, setBuySellToken] = useState<string>('dpi')
  const [isFetchingOrderData, setIsFetchingOrderData] = useState<boolean>(false)
  const [isUserBuying, setIsUserBuying] = useState<boolean>(true)
  const [activeField, setActiveField] = useState<'currency' | 'set'>('currency')
  const [buyToken, setBuyToken] = useState<string>()
  const [sellToken, setSellToken] = useState<string>()
  const [amount, setAmount] = useState<string>('')
  const [selectedCurrency, setSelectedCurrency] = useState<any>()
  const [zeroExTradeData, setZeroExTradeData] = useState<any>()
  const [currencyOptions, setCurrencyOptions] = useState<any[]>([])

  const { onSetTransactionId, onSetTransactionStatus } = useTransactionWatcher()

  const {
    ethBalance,
    dpiBalance,
    mviBalance,
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
    setSellToken('ETH')
    setBuyToken(buySellToken)
    setCurrencyOptions(currencyTokens)
    setSelectedCurrency(currencyTokens[0])
  }, [])

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
  } else if (selectedCurrency === 'eth') {
    spendingTokenBalance = ethBalance || new BigNumber(0)
  } else if (selectedCurrency === 'mcd') {
    spendingTokenBalance = daiBalance || new BigNumber(0)
  } else if (selectedCurrency === 'usdc') {
    spendingTokenBalance = usdcBalance || new BigNumber(0)
  }

  useEffect(() => {
    if (!amount) return

    setIsFetchingOrderData(true)

    if (isUserBuying) {
      setBuyToken(buySellToken)
      setSellToken(selectedCurrency.label)
    } else {
      setBuyToken(selectedCurrency.label)
      setSellToken(buySellToken)
    }

    const isExactInputTrade = !isUserBuying || activeField === 'currency'

    getZeroExTradeData(
      isUserBuying,
      isExactInputTrade,
      sellToken || '',
      buyToken || '',
      amount || ''
    ).then((data) => {
      setZeroExTradeData(data)
      setIsFetchingOrderData(false)
    })
  }, [
    isUserBuying,
    selectedCurrency,
    activeField,
    buySellToken,
    amount,
    buyToken,
    sellToken,
  ])

  const onExecuteBuySell = useCallback(async () => {
    if (!account || !zeroExTradeData?.sellAmount || !selectedCurrency) return

    let requiredBalance = new BigNumber(zeroExTradeData?.sellAmount).dividedBy(
      new BigNumber(10).pow(18)
    )

    // if (selectedCurrency === 'usdc') {
    //   requiredBalance = new BigNumber(zeroExTradeData?.sellAmount || 0).dividedBy(
    //     new BigNumber(10).pow(6)
    //   );
    // }

    // if (spendingTokenBalance?.isLessThan(requiredBalance)) return

    const web3 = new Web3(ethereum)

    zeroExTradeData.from = account
    const tx = await web3.eth.sendTransaction(zeroExTradeData)

    try {
      onSetTransactionStatus(TransactionStatusType.IS_APPROVING)

      const transactionId = tx.transactionHash

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
          selectedCurrency,
          buySellToken,
          isUserBuying
        )
      } else {
        onSetTransactionStatus(TransactionStatusType.IS_FAILED)
        trackReferral(
          referralCode,
          transactionId as string,
          'PENDING OR FAILED',
          selectedCurrency,
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

  const onSetActiveField = (field: 'currency' | 'set') => setActiveField(field)

  const onSetAmount = (amount: string) => {
    setAmount(amount)
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
        amount,
        onSetBuySellToken: setBuySellToken,
        onToggleIsUserBuying,
        onSetActiveField,
        onSetSelectedCurrency,
        onSetAmount,
        onExecuteBuySell,
      }}
    >
      {children}
    </BuySellContext.Provider>
  )
}

export default BuySellProvider
