import React from 'react';
import styled from 'styled-components'
import BigNumber from "bignumber.js";

type HistoryReturnProps = {
  totalSupply: BigNumber,
  totalBonded: BigNumber,
  SSDLPBonded: BigNumber,
};

const HistoryReturn = ({totalSupply, totalBonded, SSDLPBonded}: HistoryReturnProps) => {
  const SSDLpBonded = SSDLPBonded.toNumber()*2;
  const dao = (((((totalSupply.toNumber()*4)/100)*60)/100 + totalBonded.toNumber()) / totalBonded.toNumber());
  const lpHourly = ((((totalSupply.toNumber()*4)/100)*40)/100 + SSDLpBonded) / SSDLpBonded;
  const lpDaily = (((((totalSupply.toNumber()*4)/100)*40)/100)*24 + SSDLpBonded) / SSDLpBonded;

  return (
    <div className="mt-4">
      <Title>Yield</Title>
      <Container>
        <div style={{flexBasis: '48%', maxWidth: 300}}>
          <ContainerItem>
            <div>
              <p>DAO hourly:</p>
              <p>DAO daily:</p>
            </div>
            <div className="text-right">
              <p>{((dao - 1)*100).toFixed(2)}%</p>
              <p>{((dao - 1)*24*100).toFixed(2)}%</p>
            </div>
          </ContainerItem>
        </div>
        <div style={{flexBasis: '48%', maxWidth: 300}}>
          <ContainerItem>
            <div>
              <p>LP hourly:</p>
              <p>LP daily:</p>
            </div>
            <div className="text-right">
              <p>{((lpHourly - 1)*100).toFixed(2)}%</p>
              <p>{((lpDaily - 1)*100).toFixed(2)}%</p>
            </div>
          </ContainerItem>
        </div>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 522px) {
    display: block;
  }
`

const ContainerItem = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h2`
  font-weight: bold;
`

export default HistoryReturn;