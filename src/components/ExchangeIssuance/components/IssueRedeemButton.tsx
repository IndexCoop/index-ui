import React from 'react'

import { RoundedButton } from 'components/RoundedButton'
import useExchangeIssuance from 'hooks/useExchangeIssuance'
import useWallet from 'hooks/useWallet'
import useApproval from 'hooks/useApproval'
import {
  daiTokenAddress,
  usdcTokenAddress,
  dpiTokenAddress,
  cgiTokenAddress,
  exchangeIssuanceAddress,
} from 'constants/ethContractAddresses'

/**
 * IssueRedeemButton - Displays a button used in the issue redeem flow.
 * The button can be used to:
 * 1. Prompt user login to complete a transaction
 * 2. Prompt the user to approve input currency to Uniswap Router
 * 3. Execute the trade transaction
 */
const IssueRedeemButton: React.FC = () => {
  const {
    issuanceToken,
    isFetchingOrderData,
    isUserIssuing,
    currencyQuantity,
    tokenQuantity,
    issuanceData,
    selectedCurrency,
    onExecuteIssuance,
  } = useExchangeIssuance()

  const { account, onOpenWalletModal } = useWallet()
  const daiApproval = useApproval(daiTokenAddress, exchangeIssuanceAddress)
  const usdcApproval = useApproval(usdcTokenAddress, exchangeIssuanceAddress)
  const dpiApproval = useApproval(dpiTokenAddress, exchangeIssuanceAddress)
  const cgiApproval = useApproval(cgiTokenAddress, exchangeIssuanceAddress)

  // Only prompt the user at end of the buy flow. (So they can preview the order before logging in)
  const loginRequiredBeforeSubmit = issuanceData?.amountIn && !account

  const dpiApprovalRequired =
    !isUserIssuing &&
    issuanceToken.toLowerCase() === 'dpi' &&
    !dpiApproval.isApproved
  const dpiApproving =
    !isUserIssuing &&
    issuanceToken.toLowerCase() === 'dpi' &&
    dpiApproval.isApproving

  const cgiApprovalRequired =
    !isUserIssuing &&
    issuanceToken.toLowerCase() === 'cgi' &&
    !cgiApproval.isApproved
  const cgiApproving =
    !isUserIssuing &&
    issuanceToken.toLowerCase() === 'cgi' &&
    cgiApproval.isApproving

  const daiApprovalRequired =
    isUserIssuing && selectedCurrency?.id === 'mcd' && !daiApproval.isApproved
  const daiApproving =
    isUserIssuing && selectedCurrency?.id === 'mcd' && daiApproval.isApproving

  const usdcApprovalRequired =
    isUserIssuing && selectedCurrency?.id === 'usdc' && !usdcApproval.isApproved
  const usdcApproving =
    isUserIssuing && selectedCurrency?.id === 'usdc' && usdcApproval.isApproving

  let buttonText: string
  let buttonAction: (...args: any[]) => any
  if (loginRequiredBeforeSubmit) {
    buttonText = 'Login'
    buttonAction = onOpenWalletModal
  } else if (dpiApproving || daiApproving || cgiApproving || usdcApproving) {
    buttonText = 'Approving'
    buttonAction = () => {}
  } else if (dpiApprovalRequired) {
    buttonText = 'Approve DPI'
    buttonAction = dpiApproval.onApprove
  } else if (cgiApprovalRequired) {
    buttonText = 'Approve CGI'
    buttonAction = cgiApproval.onApprove
  } else if (daiApprovalRequired) {
    buttonText = 'Approve DAI'
    buttonAction = daiApproval.onApprove
  } else if (usdcApprovalRequired) {
    buttonText = 'Approve USDC'
    buttonAction = usdcApproval.onApprove
  } else if (isUserIssuing) {
    buttonText = 'Issue'
    buttonAction = onExecuteIssuance
  } else {
    buttonText = 'Redeem'
    buttonAction = onExecuteIssuance
  }
  const isApprovalRequired =
    dpiApprovalRequired ||
    cgiApprovalRequired ||
    daiApprovalRequired ||
    usdcApprovalRequired

  return (
    <RoundedButton
      buttonClassName={issuanceToken}
      isDisabled={!isApprovalRequired && (!currencyQuantity || !tokenQuantity)}
      isPending={isFetchingOrderData}
      text={buttonText}
      onClick={buttonAction}
    />
  )
}

export default IssueRedeemButton
