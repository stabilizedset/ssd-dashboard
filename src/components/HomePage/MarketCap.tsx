import React from 'react';
import BigNumber from "bignumber.js";
import styled from 'styled-components'

import {formatNumber} from '../../utils/number'

type MarketCapProps = {
  totalSupply: BigNumber,
  pairBalanceUSDC: BigNumber,
  pairBalanceSSD: BigNumber
};

const MarketCap = ({totalSupply, pairBalanceUSDC, pairBalanceSSD}: MarketCapProps) => {
  const price = pairBalanceUSDC.dividedBy(pairBalanceSSD);

  return (
    <div>
      <div style={{fontSize: 16, padding: 3}}>Market Cap
        <Icon src="./images/coingecko.ico"
              onClick={() => window.open('https://www.coingecko.com/en/coins/stabilized-set-dollar', '_blank')}
        />
      </div>
      <div style={{
        fontSize: 24,
        padding: 3,
        fontWeight: 400,
        lineHeight: 1.5,
        fontFamily: 'aragon-ui-monospace, monospace'
      }}>{formatNumber((totalSupply.multipliedBy(price)).toFixed(2))}$
      </div>
    </div>
  );
};

const Icon = styled.img`
  margin: 0 5px;
  border: 1px solid #ffffff;
  border-radius: 10px;
  background-color: #ffffff;
  width: 20px;
  cursor: pointer;
`

export default MarketCap;