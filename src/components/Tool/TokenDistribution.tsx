import React from 'react';
import styled from 'styled-components'
import BigNumber from "bignumber.js";
import {ownership} from "../../utils/number";

type TokenDistributionProps = {
  totalBonded: BigNumber,
  totalStaged: BigNumber,
  totalRedeemable: BigNumber,
  totalSupplyUni: BigNumber,
  poolTotalBonded: BigNumber,
  poolTotalStaged: BigNumber,
};

const TokenDistribution = ({totalBonded, totalStaged, totalRedeemable, totalSupplyUni, poolTotalBonded, poolTotalStaged}: TokenDistributionProps) => {
  const daoTotalSupply = totalBonded.plus(totalStaged).plus(totalRedeemable);

  return (
    <>
      <Title>Token Distribution</Title>
      <Container>
        <div>
          <p>LP Staged:</p>
          <p>LP Bonded:</p>
          <p>DAO Staged:</p>
          <p>DAO Bonded:</p>
        </div>
        <div className="text-right">
          <p>{+(ownership(poolTotalStaged, totalSupplyUni).toNumber().toFixed(2))}%</p>
          <p>{+(ownership(poolTotalBonded, totalSupplyUni).toNumber().toFixed(2))}%</p>
          <p>{+(ownership(totalStaged, daoTotalSupply).toNumber().toFixed(2))}%</p>
          <p>{+(ownership(totalBonded, daoTotalSupply).toNumber().toFixed(2))}%</p>
        </div>
      </Container>
    </>
  );
};


const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h2`
  font-weight: bold;
`

export default TokenDistribution;