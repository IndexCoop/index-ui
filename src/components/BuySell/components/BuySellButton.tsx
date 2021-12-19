import React from 'react'

import { RoundedButton } from 'components/RoundedButton'
import {
  exchangeIssuanceZeroExAddress,
  zeroExRouterAddress,
} from 'constants/ethContractAddresses'
import useApproval from 'hooks/useApproval'
import useBuySell from 'hooks/useBuySell'
import useWallet from 'hooks/useWallet'

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
    sellTokenAddress,
    requestStatus,
    isUsingExchangeIssuance,
    onExecuteBuySell,
    selectedCurrency,
  } = useBuySell()

  const { account, onOpenWalletModal } = useWallet()

  const loginRequired = !account
  const requestFailed = ['failure', 'insufficientLiquidity'].includes(
    requestStatus
  )

  console.log("Exchange issuance address", exchangeIssuanceZeroExAddress);
  const approvalTarget = isUsingExchangeIssuance
    ? exchangeIssuanceZeroExAddress
    : zeroExRouterAddress
  const tokenApproval = useApproval(sellTokenAddress, approvalTarget)

  const tokenApprovalRequired = !tokenApproval.isApproved
  const tokenApproving = tokenApproval.isApproving
  const ignoreApproval = isUserBuying && selectedCurrency?.label === 'ETH'

  let buttonText: string
  let buttonAction: (...args: any[]) => any

  if (requestFailed) {
    if (requestStatus === 'insufficientLiquidity') {
      buttonText = 'Insufficient Liquidity'
    } else {
      buttonText = 'Request Failed'
    }
    buttonAction = () => console.warn('Ignore click since request failed')
  } else if (tokenApproving && !ignoreApproval) {
    buttonText = 'Approving'
    buttonAction = () => {}
  } else if (tokenApprovalRequired && !ignoreApproval) {
    buttonText = 'Approve Tokens'
    buttonAction = tokenApproval.onApprove
  } else if (loginRequired) {
    buttonText = 'Login'
    buttonAction = onOpenWalletModal
  } else {
    buttonAction = onExecuteBuySell
    buttonText = isUserBuying ? 'Buy' : 'Sell'
  }

  return (
    <RoundedButton
      buttonClassName={buySellToken}
      isDisabled={requestFailed}
      isPending={isFetchingOrderData}
      text={buttonText}
      onClick={buttonAction}
    />
  )
}

export default BuySellButton
