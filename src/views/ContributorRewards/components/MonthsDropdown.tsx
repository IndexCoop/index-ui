import React, { useMemo } from 'react'
import { useTheme } from 'react-neu'
import { NavLink, useLocation } from 'react-router-dom'
import Select from 'react-select'
import styled from 'styled-components'

const CustomOption = (props: any) => {
  const { innerProps, value, label, data } = props
  return (
    <DropdownOption {...innerProps}>
      <StyledMonth>{label}</StyledMonth>
    </DropdownOption>
  )
}

const MonthsDropdown: React.FC = () => {
  const theme = useTheme()
  const { pathname } = useLocation()

  const dropdownSelectStyles = useMemo(() => {
    return {
      control: (styles: any) => ({
        ...styles,
        background: 'none',
        border: 'none',
      }),
      singleValue: (styles: any) => ({
        ...styles,
        'font-weight': 600,
        'font-size': '28px',
        'color': theme.colors.white[500],
        'cursor': 'pointer',
        '&:hover': {
          color: theme.colors.grey[500],
        },
      }),
      menu: (styles: any) => ({
        ...styles,
        color: 'black',
      }),
      dropdownIndicator: (styles: any) => ({
        ...styles,
        'font-weight': 600,
        'font-size': '28px',
        'color': theme.colors.white[500],
        'cursor': 'pointer',
        '&:hover': {
          color: theme.colors.grey[500],
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
      value={{ label: 'November' } as any}
      options={[
        {
          value: 'November',
          label: 'November',
        },
      ]}
      components={{
        Option: CustomOption,
      }}
      styles={dropdownSelectStyles}
    />
  )
}

const DropdownOption = styled.div`
  margin: 10px;
`

const StyledMonth = styled.div`
  color: ${(props) => props.theme.colors.grey[500]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary.light};
  }
`

export default MonthsDropdown
