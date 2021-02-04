import React, { useMemo } from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'
import Select from 'react-select'
import { useTheme } from 'react-neu'

const CustomOption = (props: any) => {
  const { innerProps, value, label, data } = props

  if (data?.link) {
    return (
      <CustomDropdownOption {...innerProps}>
        <StyledOutboundLink href={data.link} target='_blank'>
          {label}
        </StyledOutboundLink>
      </CustomDropdownOption>
    )
  }

  return (
    <CustomDropdownOption {...innerProps}>
      <StyledLink exact activeClassName='active' to={`/${value}`}>
        {label}
      </StyledLink>
    </CustomDropdownOption>
  )
}

const ProductsDropdown: React.FC = () => {
  const theme = useTheme()
  const { pathname } = useLocation()

  const dropdownSelectStyles = useMemo(() => {
    const isResourcesRouteActive =
      pathname === '/about' ||
      pathname === '/news' ||
      pathname === '/rewards' ||
      pathname === '/how-to-buy'

    return {
      control: (styles: any) => ({
        ...styles,
        width: 130,
        background: 'none',
        border: 'none',
      }),
      singleValue: (styles: any) => ({
        ...styles,
        'color': isResourcesRouteActive
          ? theme.colors.primary.light
          : theme.colors.grey[500],
        'fontWeight': 600,
        'cursor': 'pointer',
        '&:hover': {
          color: isResourcesRouteActive
            ? theme.colors.primary.light
            : theme.colors.grey[600],
        },
      }),
      menu: (styles: any) => ({
        ...styles,
        color: 'black',
      }),
      dropdownIndicator: (styles: any) => ({
        ...styles,
        'color': isResourcesRouteActive
          ? theme.colors.primary.light
          : theme.colors.grey[500],
        'cursor': 'pointer',
        '&:hover': {
          color: isResourcesRouteActive
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
      value={{ label: 'Resources' } as any}
      options={[
        {
          value: 'about',
          label: 'About',
        },
        {
          value: 'news',
          label: 'News',
        },
        {
          value: 'docs',
          label: 'Docs',
          link: 'https://docs.indexcoop.com/',
        },
        {
          value: 'rewards',
          label: 'Rewards',
        },
        {
          value: 'how-to-buy',
          label: 'How to Buy',
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
  width: 120px;
  margin: 10px;
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

const StyledOutboundLink = styled.a`
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
