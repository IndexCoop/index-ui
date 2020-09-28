import React from "react";
import { Container, Spacer } from "react-neu";
import styled from "styled-components";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Manifesto from "components/Manifesto";

import useBalances from "hooks/useBalances";

import MigrationNotice from "./components/MigrationNotice";
import Treasury from "./components/Treasury";

const Home: React.FC = () => {
  const { yamV2Balance } = useBalances();
  return (
    <Page>
      <PageHeader
        icon="🦉"
        title="The Index DAO"
        subtitle="The community curated crypto index"
      />
      <StyledViewFarmButton>View Farms</StyledViewFarmButton>
      <Spacer />
      <StyledIndexImage />
      <Spacer />
      <Treasury />
      <Spacer />
      <Manifesto />
      <Container>
        {yamV2Balance && yamV2Balance.toNumber() >= 0 && (
          <>
            <MigrationNotice />
            <Spacer />
          </>
        )}
      </Container>
    </Page>
  );
};

const StyledIndexImage = styled.div`
  width: 600px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
`;

const StyledViewFarmButton = styled.button`
  color: ${(props) => props.theme.colors.primary.light};
  font-size: 16px;
  padding: 15px 60px;
  border-radius: 40px;
  background-color: ${(props) => props.theme.colors.primary.dark};
  &:visited {
    color: ${(props) => props.theme.colors.primary.light};
  }
`;

export default Home;
