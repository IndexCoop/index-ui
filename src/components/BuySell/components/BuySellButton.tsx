import React from 'react'

import { RoundedButton } from 'components/RoundedButton'
import useBuySell from 'hooks/useBuySell'
import useWallet from 'hooks/useWallet'
import useApproval from 'hooks/useApproval'
import {
  daiTokenAddress,
  usdcTokenAddress,
  dpiTokenAddress,
  cgiTokenAddress,
  indexTokenAddress,
  uniswapRouterAddress,
} from 'constants/ethContractAddresses'

/**
 * BuySellButton - Displays a button used in the buy sell flow.
 * The button can be used to:
 * 1. Prompt user login to complete a transaction
 * 2. Prompt the user to approve input currency to Uniswap Router
 * 3. Execute the trade transaction
 */
const BuySellButton: React.FC = () => {
  const {
    buySellToken,
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
  const cgiApproval = useApproval(cgiTokenAddress, uniswapRouterAddress)
  const indexApproval = useApproval(indexTokenAddress, uniswapRouterAddress)

  // Only prompt the user at end of the buy flow. (So they can preview the order before logging in)
  const loginRequiredBeforeSubmit = uniswapData?.amount_in && !account

  const dpiApprovalRequired =
    !isUserBuying &&
    buySellToken.toLowerCase() === 'dpi' &&
    !dpiApproval.isApproved
  const dpiApproving =
    !isUserBuying &&
    buySellToken.toLowerCase() === 'dpi' &&
    dpiApproval.isApproving

  const cgiApprovalRequired =
    !isUserBuying &&
    buySellToken.toLowerCase() === 'cgi' &&
    !cgiApproval.isApproved
  const cgiApproving =
    !isUserBuying &&
    buySellToken.toLowerCase() === 'cgi' &&
    cgiApproval.isApproving

  const indexApprovalRequired =
    !isUserBuying &&
    buySellToken.toLowerCase() === 'index' &&
    !indexApproval.isApproved
  const indexApproving =
    !isUserBuying &&
    buySellToken.toLowerCase() === 'index' &&
    indexApproval.isApproving

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
  } else if (
    dpiApproving ||
    indexApproving ||
    daiApproving ||
    cgiApproving ||
    usdcApproving
  ) {
    buttonText = 'Approving'
    buttonAction = () => {}
  } else if (dpiApprovalRequired) {
    buttonText = 'Approve DPI'
    buttonAction = dpiApproval.onApprove
  } else if (cgiApprovalRequired) {
    buttonText = 'Approve CGI'
    buttonAction = cgiApproval.onApprove
  } else if (indexApprovalRequired) {
    buttonText = 'Approve INDEX'
    buttonAction = indexApproval.onApprove
  } else if (daiApprovalRequired) {
    buttonText = 'Approve DAI'
    buttonAction = daiApproval.onApprove
  } else if (usdcApprovalRequired) {
    buttonText = 'Approve USDC'
    buttonAction = usdcApproval.onApprove
  } else if (isUserBuying) {
    buttonText = 'Buy'
    buttonAction = onExecuteBuySell
  } else {
    buttonText = 'Sell'
    buttonAction = onExecuteBuySell
  }

  return (
    <RoundedButton
      buttonClassName={buySellToken}
      isDisabled={!currencyQuantity || !tokenQuantity}
      isPending={isFetchingOrderData}
      text={buttonText}
      onClick={buttonAction}
    />
  )
}

export default BuySellButton
