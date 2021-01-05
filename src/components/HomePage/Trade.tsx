import React from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components'
import {Button} from '@aragon/ui';

import {BalanceBlock, AddressBlock} from '../common/index';
import {UNISWAP_INFO, UNISWAP_SUPPLY, UNISWAP_TRADE, DEXTOOL} from "../../constants/contracts";

type TradeProps = {
  pairBalanceSSD: BigNumber,
  pairBalanceUSDC: BigNumber,
  uniswapPair: string,
};

const Trade = ({pairBalanceSSD, pairBalanceUSDC, uniswapPair}: TradeProps) => {
  const price = pairBalanceUSDC.dividedBy(pairBalanceSSD);

  return (
    <>
      <Container style={{paddingBottom: '0%'}}>
        <div style={{flexBasis: '25%'}}>
          <BalanceBlock asset="SSD Price" balance={price} suffix={"USDC"}/>
          <Button
            label="Buy SSD"
            icon={<i className="fas fa-exchange-alt"/>}
            onClick={() => window.open(UNISWAP_TRADE, "_blank")}
          />
        </div>
        <div style={{flexBasis: '25%'}}>
          <BalanceBlock asset="SSD Liquidity" balance={pairBalanceSSD} suffix={"SSD"}/>
          <Button
            label="Info"
            icon={<i className="fas fa-chart-area"/>}
            onClick={() => window.open(UNISWAP_INFO, "_blank")}
          />
        </div>
        <div style={{flexBasis: '25%'}}>
          <BalanceBlock asset="USDC Liquidity" balance={pairBalanceUSDC} suffix={"USDC"}/>
          <Button
            label="Add Liquidity"
            icon={<i className="fas fa-water"/>}
            onClick={() => window.open(UNISWAP_SUPPLY, "_blank")}
          />
        </div>
        <div style={{flexBasis: '25%'}}>
            <AddressBlock label="Uniswap Contract" address={uniswapPair}/>
            <Button
              label="DEXTools Chart"
              icon={<i className="fas fa-chart-line"/>}
              onClick={() => window.open(UNISWAP_INFO, "_blank")}
              style={{
                marginTop: 4.58
              }}
            />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 3% 3%;
  @media (max-width: 522px) {
    display: block;
  }
`

export default Trade;
