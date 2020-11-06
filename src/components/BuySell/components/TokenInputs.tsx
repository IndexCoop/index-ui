import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import Select from 'react-select'

import useBuySell from 'hooks/useBuySell'

const TokenInputs: React.FC = () => {
  const {
    isFetchingOrderData,
    isUserBuying,
    activeField,
    selectedCurrency,
    currencyQuantity,
    tokenQuantity,
    currencyOptions,
    onSetActiveField,
    onSetCurrencyQuantity,
    onSetTokenQuantity,
    onSetSelectedCurrency,
  } = useBuySell()

  const selectStyles = {
    control: (styles: any) => ({
      ...styles,
      width: 100,
      background: 'none',
      border: 'none',
      color: 'white',
      marginRight: -10,
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: 'white',
      fontWeight: 600,
      fontSize: 20,
      marginLeft: 20,
    }),
    menu: (styles: any) => ({
      ...styles,
      color: 'black',
    }),
    indicatorSeparator: () => ({}),
    indicatorContainer: (styles: any) => ({
      ...styles,
      marginLeft: 0,
      padding: 0,
    }),
  }

  const currencyInputRef = useRef<any>()
  const setTokenInputRef = useRef<any>()

  useEffect(() => {
    if (activeField === 'currency' && currencyInputRef) {
      currencyInputRef?.current?.focus()
    }

    if (activeField === 'set' && setTokenInputRef) {
      setTokenInputRef?.current?.focus()
    }
  }, [activeField])

  if (isUserBuying) {
    return (
      <>
        <StyledCurrencyContainer
          isActive={activeField === 'currency'}
          onClick={() => onSetActiveField('currency')}
        >
          <StyledCurrencyContainerLabel>Pay with</StyledCurrencyContainerLabel>
          <StyledCurrencySelectWrapper>
            <StyledInputField
              ref={currencyInputRef}
              value={currencyQuantity}
              type='number'
              min='0'
              step='0.01'
              onChange={onSetCurrencyQuantity}
              onFocus={() => onSetActiveField('currency')}
            />
            <Select
              value={selectedCurrency}
              options={currencyOptions}
              styles={selectStyles}
              onChange={onSetSelectedCurrency}
            />
          </StyledCurrencySelectWrapper>
        </StyledCurrencyContainer>

        <StyledCurrencyContainer
          isActive={activeField === 'set'}
          onClick={() => onSetActiveField('set')}
        >
          <StyledCurrencyContainerLabel>
            Buy (estimated)
          </StyledCurrencyContainerLabel>
          <StyledCurrencySelectWrapper>
            <StyledInputField
              ref={setTokenInputRef}
              value={tokenQuantity}
              type='number'
              min='0'
              step='0.01'
              onChange={onSetTokenQuantity}
              onFocus={() => onSetActiveField('set')}
            />
            <StyledTargetTokenSymbol>DPI</StyledTargetTokenSymbol>
          </StyledCurrencySelectWrapper>
        </StyledCurrencyContainer>
      </>
    )
  }

  return (
    <>
      <StyledCurrencyContainer
        isActive={activeField === 'set'}
        onClick={() => onSetActiveField('set')}
      >
        <StyledCurrencyContainerLabel>Sell</StyledCurrencyContainerLabel>
        <StyledCurrencySelectWrapper>
          <StyledInputField
            ref={setTokenInputRef}
            value={tokenQuantity}
            type='number'
            min='0'
            step='0.01'
            onChange={onSetTokenQuantity}
            onFocus={() => onSetActiveField('set')}
          />
          <StyledTargetTokenSymbol>DPI</StyledTargetTokenSymbol>
        </StyledCurrencySelectWrapper>
      </StyledCurrencyContainer>

      <StyledCurrencyContainer
        isActive={activeField === 'currency'}
        onClick={() => onSetActiveField('currency')}
      >
        <StyledCurrencyContainerLabel>
          Receive (estimated)
        </StyledCurrencyContainerLabel>

        <StyledCurrencySelectWrapper>
          <StyledInputField
            ref={currencyInputRef}
            value={currencyQuantity}
            type='number'
            min='0'
            step='0.01'
            onChange={onSetCurrencyQuantity}
            onFocus={() => onSetActiveField('currency')}
          />
          <Select
            value={selectedCurrency}
            options={currencyOptions}
            styles={selectStyles}
            onChange={onSetSelectedCurrency}
          />
        </StyledCurrencySelectWrapper>
      </StyledCurrencyContainer>
    </>
  )
}

interface CurrencyContainerProps {
  isActive?: boolean
}

const StyledCurrencyContainer = styled.div<CurrencyContainerProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors.transparentColors.grey};
  border-radius: ${(props) => props.theme.borderRadius}px;
  cursor: pointer;

  ${(props) =>
    props.isActive &&
    css`
      background-color: transparent;
      border: 1px solid ${props.theme.colors.transparentColors.grey};
    `}
`

const StyledCurrencyContainerLabel = styled.div`
  font-size: 14px;
`

const StyledCurrencySelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledInputField = styled.input`
  font-size: 20px;
  width: 50%;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  padding: 0px;
  border-radius: 4px;
  background: none;
  border: none;
  &:focus {
    outline: none;
  }
`

const StyledTargetTokenSymbol = styled.span`
  font-size: 20px;
  font-weight: 600;
`

export default TokenInputs
