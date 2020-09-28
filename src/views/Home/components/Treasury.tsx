import React from "react";

import numeral from "numeral";
import { Spacer, Container } from "react-neu";

import FancyValue from "components/FancyValue";
import Split from "components/Split";

import useTreasury from "hooks/useTreasury";

const Treasury: React.FC = () => {
  const { totalYUsdValue, yamBalance } = useTreasury();

  const treasuryValue =
    typeof totalYUsdValue !== "undefined"
      ? "$" + numeral(totalYUsdValue * 1.15).format("0.00a")
      : "--";

  const yamValue =
    typeof yamBalance !== "undefined"
      ? numeral(yamBalance).format("0.00a")
      : "--";

  return (
    <Container>
      <Split>
        <FancyValue icon="💰" label="Capital in Farms" value={treasuryValue} />
        <FancyValue icon="🍠" label="$INDEX Price" value={yamValue} />
      </Split>
      <Spacer />
    </Container>
  );
};

export default Treasury;
