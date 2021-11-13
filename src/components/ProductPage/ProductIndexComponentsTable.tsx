import React, { useState } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

import { ProductPageSection } from './ProductPageLayouts'
import { SetComponent } from 'contexts/SetComponents/SetComponent'

interface ProductIndexComponentsProps {
  components?: SetComponent[]
}

const ProductIndexComponentsTable: React.FC<ProductIndexComponentsProps> = ({
  components
}) => {
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

        {components?.slice(0, amountToDisplay).map((data) => (
          <ComponentRow key={data.name} component={data} />
        ))}
      </IndexComponentsTable>

      {renderTableDisplayControls()}
    </ProductPageSection>
  )
}

interface ComponentRowProps {
  component: SetComponent
}

const ComponentRow: React.FC<ComponentRowProps> = ({ component }) => {
  const {
    symbol,
    quantity,
    percentOfSet,
    totalPriceUsd,
    image,
    name,
  } = component
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
    </>
  )
}

const IndexComponentsTable = styled.div`
  display: grid;
  grid-template-columns: [logo] 25px repeat(2, 1fr);
  grid-column-gap: ${({ theme }) => theme.spacing[3]}px;
  grid-row-gap: ${({ theme }) => theme.spacing[4]}px;

  @media (min-width: 768px) {
    grid-template-columns: [logo] 25px repeat(2, 1.5fr) repeat(2, 1fr);
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
