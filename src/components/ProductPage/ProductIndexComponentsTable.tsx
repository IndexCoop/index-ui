import React, { useState } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

import { ProductPageSection } from './ProductPageLayouts'
import IndexComponent from 'components/IndexComponent'
import { SetComponent } from "../../contexts/SetComponents/SetComponent"

interface ProductIndexComponentsProps {
  indexComponents?: IndexComponent[]
  /**
   * setComponents is a subset of information in components. If provided, it
   * will be used to populate the index token allocation table. If undefined,
   * components will be used instead.
   */
  setComponents?: SetComponent[]
}

const ProductIndexComponentsTable: React.FC<ProductIndexComponentsProps> = ({
  indexComponents,
  setComponents
}) => {
  const components = indexComponents?.map(indexComponent => {
    if (!setComponents || setComponents.length === 0) {
      return indexComponent
    }
    const matchingSetComponents = setComponents.filter(setComponent => setComponent.address === indexComponent.address)
    if (matchingSetComponents.length !== 1) {
      console.warn(`Found more than one matching set component for address ${indexComponent.address}. matchingSetComponents ${matchingSetComponents}`)
      return indexComponent
    }
    return {...indexComponent, quantity: matchingSetComponents[0].quantity}
  })
  const [amountToDisplay, setAmountToDisplay] = useState<number>(5)
  const showAllComponents = () =>
    setAmountToDisplay(components?.length || amountToDisplay)
  const showDefaultComponents = () => setAmountToDisplay(5)

  const renderTableDisplayControls = () => {
    if (!components) return null

    if (amountToDisplay < components.length) {
      return (
        <TableControlText onClick={showAllComponents}>
          +{components.length - amountToDisplay} More
        </TableControlText>
      )
    }

    if (components.length < 5) return null

    return (
      <TableControlText onClick={showDefaultComponents}>
        Show Less
      </TableControlText>
    )
  }
  return (
    <ProductPageSection title='Allocations'>
      <IndexComponentsTable>
        <div>{/** empty space for logo in header */}</div>
        <StyledNameColumn>
          <StyledTableHeader>Name</StyledTableHeader>
        </StyledNameColumn>

        <DisplayOnDesktopOnly>
          <StyledTableHeader>Quantity per token</StyledTableHeader>
        </DisplayOnDesktopOnly>
        <DisplayOnDesktopOnly>
          <StyledTableHeader>Value per token</StyledTableHeader>
        </DisplayOnDesktopOnly>

        <StyledTableHeader>Allocation</StyledTableHeader>
        <StyledTableHeader>24hr Change</StyledTableHeader>

        {components?.slice(0, amountToDisplay).map((data) => (
          <ComponentRow key={data.name} component={data} />
        ))}
      </IndexComponentsTable>

      {renderTableDisplayControls()}
    </ProductPageSection>
  )
}

interface ComponentRowProps {
  component: IndexComponent
}

const ComponentRow: React.FC<ComponentRowProps> = ({ component }) => {
  const {
    symbol,
    quantity,
    percentOfSet,
    totalPriceUsd,
    dailyPercentChange,
    image,
    name,
  } = component
  // use math.abs so numeral formats negative numbers without '-' for design spec
  const percentChange = numeral(
    Math.abs(parseFloat(dailyPercentChange))
  ).format('0.00')

  const formattedPriceUSD = numeral(totalPriceUsd).format('$0,0.00')

  return (
    <>
      <StyledTokenLogo src={image} alt={`${name} Logo`} />
      <StyledNameColumn>
        <StyledTableData>{symbol}</StyledTableData>
      </StyledNameColumn>

      <DisplayOnDesktopOnly>
        <StyledTableData>
          {numeral(quantity).format('0.000000')} {symbol}
        </StyledTableData>
      </DisplayOnDesktopOnly>
      <DisplayOnDesktopOnly>
        <StyledTableData>{formattedPriceUSD}</StyledTableData>
      </DisplayOnDesktopOnly>

      <StyledTableData>{percentOfSet}%</StyledTableData>
      {parseFloat(dailyPercentChange) < 0 ? (
        <NegativeChange>{percentChange}%</NegativeChange>
      ) : (
        <PositiveChange>{percentChange}%</PositiveChange>
      )}
    </>
  )
}

const IndexComponentsTable = styled.div`
  display: grid;
  grid-template-columns: [logo] 25px repeat(3, 1fr);
  grid-column-gap: ${({ theme }) => theme.spacing[3]}px;
  grid-row-gap: ${({ theme }) => theme.spacing[4]}px;

  @media (min-width: 768px) {
    grid-template-columns: [logo] 25px repeat(2, 1.5fr) repeat(3, 1fr);
  }
`

const StyledNameColumn = styled.span`
  font-weight: 600;
`

const StyledTableHeader = styled.p`
  margin: 0;
  font-size: 12px;
`

const StyledTokenLogo = styled.img`
  width: 100%;
  height: auto;
  border-radius: 50%;
`

const StyledTableData = styled(StyledTableHeader)`
  font-size: 16px;
  line-height: 24px;
`

const PositiveChange = styled(StyledTableData)`
  color: ${({ theme }) => theme.colors.green};
`
const NegativeChange = styled(StyledTableData)`
  color: ${({ theme }) => theme.colors.red};
`

const DisplayOnDesktopOnly = styled.span`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`

const TableControlText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary.grey};
  cursor: pointer;

  :hover {
    transition: color 0.5s;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`

export default ProductIndexComponentsTable
