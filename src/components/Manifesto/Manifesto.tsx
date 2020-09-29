import React from 'react'
import { Container } from 'react-neu'
import styled from 'styled-components'

interface ExternalLinkProps {
  href?: string
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ children, href }) => (
  <Container>
    <StyledManifesto>
      <div>
        <h1>Manifesto</h1>
        <p>
          By bringing the collective minds of the world's experts in finance and
          indexes, we seek to create the world's best index products.
        </p>
        <p>
          We believe in rewarding those fairly who contribute to the success of
          the decentralized organization.
        </p>
        <p>
          Because the crypto world changes so rapidly, the methodologies for an
          ideal index composition must be able to evolve over time.
        </p>
        <p>
          Similar to MakerDAO's organization around the peg, we envision a
          congregation of the brightest mindns working together to create the
          most representative indices possible. These minds will be constantly
          updating methodologies based on the current market conditions, model
          out and discuss the composition, and more.
        </p>
      </div>
    </StyledManifesto>
  </Container>
)

const StyledManifesto = styled.a`
  color: ${(props) => props.theme.textColor};
`

export default ExternalLink
