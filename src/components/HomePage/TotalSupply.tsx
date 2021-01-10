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
      <div style={{fontSize: 16, padding: 3}}>Total Supply <Icon src="./images/etherscan.png"
      onClick={()=> window.open('https://etherscan.io/token/0x4846239fdf4d4c1aeb26729fa064b0205aca90e1', '_blank')}
      /></div>
      <div style={{
        fontSize: 24,
        padding: 3,
        fontWeight: 400,
        lineHeight: 1.5,
        fontFamily: 'aragon-ui-monospace, monospace'
      }}>{formatNumber((totalSupply.toNumber()).toFixed(2)) } SSD
      </div>
      <div style={{fontSize: 16, padding: 3}}>Status: <strong>EXPANSION (+{((totalSupply.toNumber()*4)/100).toFixed()} next epoch)</strong></div>
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