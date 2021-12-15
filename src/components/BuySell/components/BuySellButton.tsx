import React from 'react'

import { RoundedButton } from 'components/RoundedButton'
import { zeroExRouterAddress } from 'constants/ethContractAddresses'
import useApproval from 'hooks/useApproval'
import useBuySell from 'hooks/useBuySell'
import useWallet from 'hooks/useWallet'
import { getTokenAddress } from 'utils'
import { MAINNET_CHAIN_DATA } from 'utils/connectors'

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
    onExecuteBuySell,
    zeroExTradeData,
  } = useBuySell()

  const { account, onOpenWalletModal } = useWallet()

  const loginRequired = !account

  const tokenApproval = useApproval(
    zeroExTradeData?.sellTokenAddress,
    zeroExRouterAddress
  )

  const tokenApprovalRequired = !tokenApproval.isApproved
  const tokenApproving = tokenApproval.isApproving
  const ignoreApproval =
    zeroExTradeData?.sellTokenAddress ===
      getTokenAddress(MAINNET_CHAIN_DATA.chainId) ||
    zeroExTradeData?.sellTokenAddress === undefined

  let buttonText: string
  let buttonAction: (...args: any[]) => any
  if (tokenApproving && !ignoreApproval) {
    buttonText = 'Approving'
    buttonAction = () => {}
  } else if (tokenApprovalRequired && !ignoreApproval) {
    buttonText = 'Approve Tokens'
    buttonAction = tokenApproval.onApprove
  } else if (isUserBuying) {
    buttonText = 'Buy'
    buttonAction = onExecuteBuySell
  } else {
    buttonText = 'Sell'
    buttonAction = onExecuteBuySell
  }

  if (loginRequired) {
    buttonText = 'Login'
    buttonAction = onOpenWalletModal
  }

  return (
    <RoundedButton
      buttonClassName={buySellToken}
      isDisabled={!zeroExTradeData && !loginRequired}
      isPending={isFetchingOrderData}
      text={buttonText}
      onClick={buttonAction}
    />
  )
}

export default BuySellButton
