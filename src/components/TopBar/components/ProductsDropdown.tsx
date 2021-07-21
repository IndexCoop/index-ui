import React, { useMemo } from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'
import Select from 'react-select'
import { useTheme } from 'react-neu'

const CustomOption = ({ innerProps, value, label }: any) => (
  <CustomDropdownOption {...innerProps}>
    <StyledLink exact activeClassName='active' to={`/${value}`}>
      {label}
    </StyledLink>
  </CustomDropdownOption>
)

const ProductsDropdown: React.FC = () => {
  const theme = useTheme()
  const { pathname } = useLocation()

  const dropdownSelectStyles = useMemo(() => {
    const isProductRouteActive =
      pathname === '/dpi' ||
      pathname === '/index' ||
      pathname === '/ethfli' ||
      pathname === '/btcfli' ||
      pathname === '/bed'

    return {
      control: (styles: any) => ({
        ...styles,
        width: 120,
        background: 'none',
        border: 'none',
      }),
      singleValue: (styles: any) => ({
        ...styles,
        'color': isProductRouteActive
          ? theme.colors.primary.light
          : theme.colors.grey[500],
        'fontWeight': 600,
        'cursor': 'pointer',
        '&:hover': {
          color: isProductRouteActive
            ? theme.colors.primary.light
            : theme.colors.grey[600],
        },
      }),
      menu: (styles: any) => ({
        ...styles,
        color: 'black',
        width: 310,
        overflow: 'hidden',
      }),
      dropdownIndicator: (styles: any) => ({
        ...styles,
        'color': isProductRouteActive
          ? theme.colors.primary.light
          : theme.colors.grey[500],
        'cursor': 'pointer',
        '&:hover': {
          color: isProductRouteActive
            ? theme.colors.primary.light
            : theme.colors.grey[500],
        },
      }),
      indicatorSeparator: () => ({}),
      indicatorContainer: (styles: any) => ({
        ...styles,
        marginLeft: 0,
        padding: 0,
      }),
    }
  }, [theme, pathname])

  return (
    <Select
      isSearchable={false}
      value={{ label: 'Products' } as any}
      options={[
        {
          value: 'dpi',
          label: 'DeFi Pulse Index',
        },
        {
          value: 'mvi',
          label: 'Metaverse Index',
        },
        {
          value: 'ethfli',
          label: 'ETH 2x Flexible Leverage Index',
        },
        {
          value: 'btcfli',
          label: 'BTC 2x Flexible Leverage Index',
        },
        {
          value: 'bed',
          label: 'Bankless BED Index',
        },
        {
          value: 'index',
          label: 'Index Coop Token',
        },
      ]}
      components={{
        Option: CustomOption,
      }}
      styles={dropdownSelectStyles}
    />
  )
}

const CustomDropdownOption = styled.div`
  width: 300px;
  margin: 10px;
  overflow: hidden;
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.colors.grey[500]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary.light};
  }
`

export default ProductsDropdown
