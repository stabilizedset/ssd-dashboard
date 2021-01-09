import React from 'react';
import BigNumber from "bignumber.js";
import styled from 'styled-components'

import {formatNumber} from "../../utils/number";

type TotalSupplyProps = {
  totalSupply: BigNumber,
};

const TotalSupply = ({totalSupply}:TotalSupplyProps) => {

  return (
    <div>
      <div style={{fontSize: 16, padding: 0}}>Total Supply <Icon src="./images/etherscan.png"
      onClick={()=> window.open('https://etherscan.io/token/0x7bf5898a9c24818a90d9763bbf4cd1432645c17f', '_blank')}
      /></div>
      <div style={{
        fontSize: 24,
        padding: 1,
        fontWeight: 400,
        lineHeight: 1.5,
        fontFamily: 'aragon-ui-monospace, monospace'
      }}>{formatNumber((totalSupply.toNumber()).toFixed(2))}
      </div>
    </div>
  );
};

const Icon = styled.img`
  border: 1px solid #ffffff;
  border-radius: 10px;
  background-color: #ffffff;
  width: 20px;
  cursor: pointer;
`

export default TotalSupply;