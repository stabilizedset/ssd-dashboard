import React from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components'
import {Button} from '@aragon/ui';
import './style.css';
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
      <Container className="box-trade">
        <div>
          <BalanceBlock asset="SSD Price" balance={price} suffix={"USDC"}/>
          <Button
            label="Buy SSD"
            className="button-home"
            icon={<img height="28" src="./home/SSD.png"/>}
            onClick={() => window.open(UNISWAP_TRADE, "_blank")}
          />
        </div>
        <div>
          <BalanceBlock asset="SSD Liquidity" balance={pairBalanceSSD} suffix={"SSD"}/>
          <Button
            label="Info"
            className="button-home"
            icon={<img src="./home/info.png"/>}
            onClick={() => window.open(UNISWAP_INFO, "_blank")}
          />
        </div>
        <div>
          <BalanceBlock asset="USDC Liquidity" balance={pairBalanceUSDC} suffix={"USDC"}/>
          <Button
            className="button-home"
            label="Add Liquidity"
            icon={<img src="./home/add-liquidity.png"/>}
            onClick={() => window.open(UNISWAP_SUPPLY, "_blank")}
          />
        </div>
        <div>
          <AddressBlock label="Uniswap Contract" address={uniswapPair}/>
          <Button
            className="button-home"
            label="Chart"
            icon={<img src="./home/chart.png"/>}
            onClick={() => window.open(DEXTOOL, "_blank")}
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
  justify-content: space-between;
  @media (max-width: 522px) {
    display: block;
  }
`

export default Trade;
