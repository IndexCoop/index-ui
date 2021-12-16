import React from 'react'

import { RoundedButton } from 'components/RoundedButton'
import useBuySell from 'hooks/useBuySell'
import useWallet from 'hooks/useWallet'
import useApproval from 'hooks/useApproval'
import { zeroExRouterAddress } from 'constants/ethContractAddresses'
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
    requestStatus,
    isUsingExchangeIssuance,
    onExecuteBuySell,
    zeroExTradeData,
  } = useBuySell()

  const { account, onOpenWalletModal } = useWallet()

  const loginRequired = !account
  const requestFailed = requestStatus === 'failure'

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

  if (requestFailed) {
    buttonText = 'Request Failed'
    buttonAction = () => console.warn('Ignore click since request failed')
  } else if (tokenApproving && !ignoreApproval) {
    buttonText = 'Approving'
    buttonAction = () => {}
  } else if (tokenApprovalRequired && !ignoreApproval) {
    buttonText = 'Approve Tokens'
    buttonAction = tokenApproval.onApprove
  } else if (requestFailed) {
    buttonText = 'Request Failed'
    buttonAction = () => console.warn('Ignore click since request failed')
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
