import React from 'react'

import { ProductPageSection } from './ProductPageLayouts'

const ProductDescription: React.FC = ({ children }) => {
  return <ProductPageSection title='About'>{children}</ProductPageSection>
}

export default ProductDescription
