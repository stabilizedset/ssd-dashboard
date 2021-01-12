import React from 'react';
import BigNumber from "bignumber.js";
import {Box} from '@aragon/ui';
import styled from 'styled-components'

type InvestProps = {
  totalSupply: BigNumber,
  totalBonded: BigNumber,
};

const Invest = ({totalSupply, totalBonded}: InvestProps) => {
  const dao = (((((totalSupply.toNumber() * 4) / 100) * 60) / 100 + totalBonded.toNumber()) / totalBonded.toNumber());

  return (
    <Container>
      <ContainerItem style={{flexBasis: '30%', marginRight: '2%'}}>
        <Box>
          <div>
            <div style={{fontSize: 16, padding: 3}}>APY</div>
            <div style={{fontSize: 16, padding: 3}}>DAO hourly:
              <div style={{
                fontSize: 24,
                padding: 3,
                fontWeight: 400,
                lineHeight: 1.5,
                fontFamily: 'aragon-ui-monospace, monospace'
              }}>
                {((dao - 1) * 100).toFixed(2)}%
              </div>
            </div>
            <div style={{fontSize: 16, padding: 3}}>DAO daily:
              <div style={{
                fontSize: 24,
                padding: 3,
                fontWeight: 400,
                lineHeight: 1.5,
                fontFamily: 'aragon-ui-monospace, monospace'
              }}>
                {((dao - 1) * 24 * 100).toFixed(2)}%
              </div>
            </div>
            <div style={{fontSize: 16, padding: 3}}>DAO weekly:
              <div style={{
                fontSize: 24,
                padding: 3,
                fontWeight: 400,
                lineHeight: 1.5,
                fontFamily: 'aragon-ui-monospace, monospace'
              }}>
                {((dao - 1) * 168 * 100).toFixed(2)}%
              </div>
            </div>
          </div>
        </Box>
      </ContainerItem>
      <ContainerItem style={{flexBasis: '68%'}}>
        <Box className="h-100">
          <h1 style={{fontSize: 30}}><strong>Guide for DAO bonding</strong></h1>

          <p className="mt-4">Step 1: You need to have SSD in your wallet.</p>

          <p className="mt-2">Step 2: Approve your SSD to unlock Staging (skip it if you've done it)</p>

          <p className="mt-2">Step 3: Stage your SSD into DAO</p>

          <p className="mt-2">Step 4: Bond your SSD into DAO</p>

          <p className="mt-2">Step 5: Unbond and wait 48 hours to claim your rewards</p>
        </Box>
      </ContainerItem>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1%;
  @media (max-width: 522px) {
    display: block;
  }
`

const ContainerItem = styled.div`
  @media (max-width: 522px) {
    margin: 2% !important;
  }
`

export default Invest;