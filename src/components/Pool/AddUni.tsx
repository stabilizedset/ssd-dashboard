import React from 'react';
import {
  Box
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import styled from 'styled-components'

import {BalanceBlock} from '../common/index';
import {approve, approveSSD, approveDSD, approveESD, approveTSD, approveZAI, approveUSDT,approveDAI, approveWETH, approveWBTC} from '../../utils/web3';
import {buyUniV2, buyUniV2FromProxy} from '../../utils/infura';
import {toBaseUnitBN} from '../../utils/number';
import {ZAP, USDC, SSD, ESD, DSD, TSD, ZAI, USDT, DAI, WETH, WBTC} from "../../constants/tokens";
import ZapUni from "./ZapUni";

type AddUniProps = {
  user: string
  balanceUSDC: BigNumber,
  zapSSDAllowance: BigNumber,
  zapUSDCAllowance: BigNumber,
  zapESDAllowance: BigNumber,
  zapDSDAllowance: BigNumber,
  zapTSDAllowance: BigNumber,
  zapZAIAllowance: BigNumber,
  zapUSDTAllowance: BigNumber,
  zapDAIAllowance: BigNumber,
  zapWETHAllowance: BigNumber,
  zapWBTCAllowance: BigNumber,
  accountUNIBalance: BigNumber,
  balanceSSD: BigNumber,
  balanceESD: BigNumber,
  balanceDSD: BigNumber,
  balanceTSD: BigNumber,
  balanceZAI: BigNumber,
  balanceUSDT: BigNumber,
  balanceDAI: BigNumber,
  balanceWETH: BigNumber,
  balanceWBTC: BigNumber,
};

function AddUni({
                  user,
                  balanceUSDC,
                  zapSSDAllowance,
                  accountUNIBalance,
                  balanceSSD,
                  zapUSDCAllowance,
                  zapESDAllowance,
                  zapTSDAllowance,
                  zapWETHAllowance,
                  zapWBTCAllowance,
                  balanceESD,
                  zapDSDAllowance,
                  balanceDSD,
                  balanceZAI,
                  balanceDAI,
                  balanceWETH,
                  balanceWBTC,
                  balanceTSD,
                  zapZAIAllowance,
                  zapDAIAllowance,
                  balanceUSDT,
                  zapUSDTAllowance
                }: AddUniProps) {

  const handleBuyUniFromUSDC = (amount) => {
    buyUniV2(user, toBaseUnitBN(amount, USDC.decimals), USDC.addr)
  }

  const handleBuyUniFromSSD = (amount) => {
    buyUniV2(user, toBaseUnitBN(amount, SSD.decimals), SSD.addr)
  }

  const handleBuyUniFromESD = (amount) => {
    buyUniV2FromProxy(user, toBaseUnitBN(amount, ESD.decimals), ESD.addr)
  }

  const handleBuyUniFromDSD = (amount) => {
    buyUniV2FromProxy(user, toBaseUnitBN(amount, DSD.decimals), DSD.addr)
  }

  const handleBuyUniFromTSD = (amount) => {
    buyUniV2FromProxy(user, toBaseUnitBN(amount, TSD.decimals), TSD.addr)
  }

  const handleBuyUniFromZAI = (amount) => {
    buyUniV2FromProxy(user, toBaseUnitBN(amount, ZAI.decimals), ZAI.addr, true)
  }

  const handleBuyUniFromUSDT = (amount) => {
    buyUniV2FromProxy(user, toBaseUnitBN(amount, USDT.decimals), USDT.addr)
  }

  const handleBuyUniFromDAI = (amount) => {
    buyUniV2FromProxy(user, toBaseUnitBN(amount, DAI.decimals), DAI.addr)
  }

  const handleBuyUniFromWETH = (amount) => {
    buyUniV2FromProxy(user, toBaseUnitBN(amount, WETH.decimals), WETH.addr)
  }

  const handleBuyUniFromWBTC = (amount) => {
    buyUniV2FromProxy(user, toBaseUnitBN(amount, WBTC.decimals), WBTC.addr)
  }

  return (
    <Box style={{fontSize: '20px'}} heading="Invest">
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <div style={{flexBasis: '32%'}}>
          <BalanceBlock asset="Balance" balance={accountUNIBalance} suffix={"UNI-V2"}/>
        </div>
        <Container>
          <ZapUni
            user={user}
            code="SSD"
            zapAllowance={zapSSDAllowance}
            balance={balanceSSD}
            onBuyUni={handleBuyUniFromSSD}
            onApprove={() => approveSSD(SSD.addr, ZAP.addr)}
          />
          <ZapUni
            user={user}
            code="USDC"
            zapAllowance={zapUSDCAllowance}
            balance={balanceUSDC}
            onBuyUni={handleBuyUniFromUSDC}
            onApprove={() => approve(USDC.addr, ZAP.addr)}
          />
          <ZapUni
            user={user}
            code="USDT"
            zapAllowance={zapUSDTAllowance}
            balance={balanceUSDT}
            onBuyUni={handleBuyUniFromUSDT}
            onApprove={() => approveUSDT(USDT.addr, ZAP.addr)}
          />
          <ZapUni
            user={user}
            code="DAI"
            zapAllowance={zapDAIAllowance}
            balance={balanceDAI}
            onBuyUni={handleBuyUniFromDAI}
            onApprove={() => approveUSDT(DAI.addr, ZAP.addr)}
          />

          <ZapUni
            user={user}
            code="ESD"
            zapAllowance={zapESDAllowance}
            balance={balanceESD}
            onBuyUni={handleBuyUniFromESD}
            onApprove={() => approveESD(ESD.addr, ZAP.addr)}
          />

          <ZapUni
            user={user}
            code="DSD"
            zapAllowance={zapDSDAllowance}
            balance={balanceDSD}
            onBuyUni={handleBuyUniFromDSD}
            onApprove={() => approveDSD(DSD.addr, ZAP.addr)}
          />
          <ZapUni
            user={user}
            code="TSD"
            zapAllowance={zapTSDAllowance}
            balance={balanceTSD}
            onBuyUni={handleBuyUniFromTSD}
            onApprove={() => approveDSD(TSD.addr, ZAP.addr)}
          />

          <ZapUni
            user={user}
            code="ZAI"
            zapAllowance={zapZAIAllowance}
            balance={balanceZAI}
            onBuyUni={handleBuyUniFromZAI}
            onApprove={() => approveZAI(ZAI.addr, ZAP.addr)}
          />
          <ZapUni
            user={user}
            code="WETH"
            zapAllowance={zapWETHAllowance}
            balance={balanceWETH}
            onBuyUni={handleBuyUniFromWETH}
            onApprove={() => approveDSD(WETH.addr, ZAP.addr)}
          />
          <ZapUni
            user={user}
            code="WBTC"
            zapAllowance={zapWBTCAllowance}
            balance={balanceWBTC}
            onBuyUni={handleBuyUniFromWBTC}
            onApprove={() => approveDSD(WBTC.addr, ZAP.addr)}
          />


        </Container>
      </div>
    </Box>
  );
}

const Container = styled.div`
  flex: 1;
  width: 100%;
  @media (max-width: 992px) {
    flex: none;
  }
`

export default AddUni;
