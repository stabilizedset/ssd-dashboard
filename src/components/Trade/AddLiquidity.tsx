import React, { useState } from 'react';
import BigNumber from 'bignumber.js';
import { Box, Button, IconCirclePlus } from '@aragon/ui';
import { addLiquidity } from '../../utils/web3';

import { BalanceBlock, MaxButton, PriceSection } from '../common/index';
import {toBaseUnitBN, toTokenUnitsBN} from '../../utils/number';
import {SSD, UNI, USDC} from "../../constants/tokens";
import {SLIPPAGE} from "../../utils/calculation";
import BigNumberInput from "../common/BigNumberInput";

type AddliquidityProps = {
  userBalanceSSD: BigNumber,
  userBalanceUSDC: BigNumber,
  pairBalanceSSD: BigNumber,
  pairBalanceUSDC: BigNumber,
  pairTotalSupplyUNI: BigNumber,
}

function AddLiquidity({
  userBalanceSSD,
  userBalanceUSDC,
  pairBalanceSSD,
  pairBalanceUSDC,
  pairTotalSupplyUNI,
}: AddliquidityProps) {
  const [amountUSDC, setAmountUSDC] = useState(new BigNumber(0));
  const [amountSSD, setAmountSSD] = useState(new BigNumber(0));
  const [amountUNI, setAmountUNI] = useState(new BigNumber(0));

  const USDCToSSDRatio = pairBalanceUSDC.isZero() ? new BigNumber(1) : pairBalanceUSDC.div(pairBalanceSSD);
  const SSDToUSDCRatio = pairBalanceSSD.isZero() ? new BigNumber(1) : pairBalanceSSD.div(pairBalanceUSDC);

  const onChangeAmountUSDC = (amountUSDC) => {
    if (!amountUSDC) {
      setAmountSSD(new BigNumber(0));
      setAmountUSDC(new BigNumber(0));
      setAmountUNI(new BigNumber(0));
      return;
    }

    const amountUSDCBN = new BigNumber(amountUSDC)
    setAmountUSDC(amountUSDCBN);

    const amountUSDCBU = toBaseUnitBN(amountUSDCBN, USDC.decimals);
    const newAmountSSD = toTokenUnitsBN(
      amountUSDCBU.multipliedBy(SSDToUSDCRatio).integerValue(BigNumber.ROUND_FLOOR),
      USDC.decimals);
    setAmountSSD(newAmountSSD);

    const newAmountSSDBU = toBaseUnitBN(newAmountSSD, SSD.decimals);
    const pairTotalSupplyBU = toBaseUnitBN(pairTotalSupplyUNI, UNI.decimals);
    const pairBalanceSSDBU = toBaseUnitBN(pairBalanceSSD, SSD.decimals);
    const newAmountUNIBU = pairTotalSupplyBU.multipliedBy(newAmountSSDBU).div(pairBalanceSSDBU).integerValue(BigNumber.ROUND_FLOOR);
    const newAmountUNI = toTokenUnitsBN(newAmountUNIBU, UNI.decimals);
    setAmountUNI(newAmountUNI)
  };

  const onChangeAmountSSD = (amountSSD) => {
    if (!amountSSD) {
      setAmountSSD(new BigNumber(0));
      setAmountUSDC(new BigNumber(0));
      setAmountUNI(new BigNumber(0));
      return;
    }

    const amountSSDBN = new BigNumber(amountSSD)
    setAmountSSD(amountSSDBN);

    const amountSSDBU = toBaseUnitBN(amountSSDBN, SSD.decimals);
    const newAmountUSDC = toTokenUnitsBN(
      amountSSDBU.multipliedBy(USDCToSSDRatio).integerValue(BigNumber.ROUND_FLOOR),
      SSD.decimals);
    setAmountUSDC(newAmountUSDC);

    const newAmountUSDCBU = toBaseUnitBN(newAmountUSDC, USDC.decimals);
    const pairTotalSupplyBU = toBaseUnitBN(pairTotalSupplyUNI, UNI.decimals);
    const pairBalanceUSDCBU = toBaseUnitBN(pairBalanceUSDC, USDC.decimals);
    const newAmountUNIBU = pairTotalSupplyBU.multipliedBy(newAmountUSDCBU).div(pairBalanceUSDCBU).integerValue(BigNumber.ROUND_FLOOR);
    const newAmountUNI = toTokenUnitsBN(newAmountUNIBU, UNI.decimals);
    setAmountUNI(newAmountUNI)
  };

  return (
    <Box heading="Add Liquidity">
      <div style={{ display: 'flex' }}>
        {/* Pool Status */}
        <div style={{ width: '30%' }}>
          <BalanceBlock asset="USDC Balance" balance={userBalanceUSDC} />
        </div>
        {/* Add liquidity to pool */}
        <div style={{ width: '70%', paddingTop: '2%' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '35%', marginRight: '5%' }}>
              <>
                <BigNumberInput
                  adornment="SSD"
                  value={amountSSD}
                  setter={onChangeAmountSSD}
                />
                <MaxButton
                  onClick={() => {
                    onChangeAmountSSD(userBalanceSSD);
                  }}
                />
              </>
            </div>
            <div style={{ width: '35%', marginRight: '5%' }}>
              <BigNumberInput
                adornment="USDC"
                value={amountUSDC}
                setter={onChangeAmountUSDC}
              />
              <PriceSection label="Mint " amt={amountUNI} symbol=" Pool Tokens" />
            </div>
            <div style={{ width: '30%' }}>
              <Button
                wide
                icon={<IconCirclePlus />}
                label="Add Liquidity"
                onClick={() => {
                  const amountSSDBU = toBaseUnitBN(amountSSD, SSD.decimals);
                  const amountUSDCBU = toBaseUnitBN(amountUSDC, USDC.decimals);
                  addLiquidity(
                    amountSSDBU,
                    amountUSDCBU,
                    SLIPPAGE,
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}


export default AddLiquidity;
