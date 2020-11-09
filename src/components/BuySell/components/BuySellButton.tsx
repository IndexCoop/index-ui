import React from 'react'

import useBuySell from 'hooks/useBuySell'
import { BasicButton } from 'components/BasicButton'
import useWallet from 'hooks/useWallet'
import useApproval from 'hooks/useApproval'
import {
  daiTokenAddress,
  usdcTokenAddress,
  dpiTokenAddress,
  uniswapRouterAddress,
} from 'constants/tokenAddresses'

const BuySellButton: React.FC = () => {
  const {
    isFetchingOrderData,
    isUserBuying,
    currencyQuantity,
    tokenQuantity,
    uniswapData,
    selectedCurrency,
    onExecuteBuySell,
  } = useBuySell()

  const { account, onOpenWalletModal } = useWallet()
  const daiApproval = useApproval(daiTokenAddress, uniswapRouterAddress)
  const usdcApproval = useApproval(usdcTokenAddress, uniswapRouterAddress)
  const dpiApproval = useApproval(dpiTokenAddress, uniswapRouterAddress)

  const loginRequiredBeforeSubmit = uniswapData?.amount_in && !account

  const dpiApprovalRequired = !isUserBuying && !dpiApproval.isApproved
  const dpiApproving = !isUserBuying && dpiApproval.isApproving

  const daiApprovalRequired =
    isUserBuying && selectedCurrency?.id === 'mcd' && !daiApproval.isApproved
  const daiApproving =
    isUserBuying && selectedCurrency?.id === 'mcd' && daiApproval.isApproving

  const usdcApprovalRequired =
    isUserBuying && selectedCurrency?.id === 'usdc' && !usdcApproval.isApproved
  const usdcApproving =
    isUserBuying && selectedCurrency?.id === 'usdc' && usdcApproval.isApproving

  let buttonText: string
  let buttonAction: (...args: any[]) => any
  if (loginRequiredBeforeSubmit) {
    buttonText = 'Login'
    buttonAction = onOpenWalletModal
  } else if (dpiApproving || daiApproving || usdcApproving) {
    buttonText = 'Approving'
    buttonAction = () => {}
  } else if (dpiApprovalRequired) {
    buttonText = 'Approve'
    buttonAction = dpiApproval.onApprove
  } else if (daiApprovalRequired) {
    buttonText = 'Approve'
    buttonAction = daiApproval.onApprove
  } else if (usdcApprovalRequired) {
    buttonText = 'Approve'
    buttonAction = usdcApproval.onApprove
  } else if (isUserBuying) {
    buttonText = 'Buy'
    buttonAction = onExecuteBuySell
  } else {
    buttonText = 'Sell'
    buttonAction = onExecuteBuySell
  }

  return (
    <BasicButton
      isDisabled={!currencyQuantity || !tokenQuantity}
      isPending={isFetchingOrderData}
      text={buttonText}
      onClick={buttonAction}
    />
  )
}

export default BuySellButton
