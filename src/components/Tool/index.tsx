import React, {useEffect, useState} from 'react';
import styled from 'styled-components'

import NextEpoch from "./NextEpoch";
import {
  getEpoch,
  getPoolTotalBonded, getPoolTotalStaged, getPrice0CumulativeLast, getReserves, getTokenBalance,
  getTokenTotalSupply,
  getTotalBonded, getTotalCoupons, getTotalDebt,
  getTotalRedeemable,
  getTotalStaged,
  getTotalSupplyUni
} from "../../utils/infura";
import {SSD, SSDS, UNI, USDC} from "../../constants/tokens";
import BigNumber from "bignumber.js";
import {toTokenUnitsBN} from "../../utils/number";
import TokenDistribution from "./TokenDistribution";
import HistoryReturn from "./HistoryReturn";
import {getPoolAddress} from "../../utils/pool";

function Tool() {
  const [epoch, setEpoch] = useState(0);

  const [totalSupply, setTotalSupply] = useState(new BigNumber(0));
  const [totalBonded, setTotalBonded] = useState(new BigNumber(0));
  const [totalStaged, setTotalStaged] = useState(new BigNumber(0));
  const [totalSupplyUni, setTotalSupplyUni] = useState(new BigNumber(0));
  const [poolTotalBonded, setPoolTotalBonded] = useState(new BigNumber(0));
  const [poolTotalStaged, setPoolTotalStaged] = useState(new BigNumber(0));

  const [totalRedeemable, setTotalRedeemable] = useState(new BigNumber(0));

  const [totalDebt, setTotalDebt] = useState(new BigNumber(0));
  const [totalCoupons, setTotalCoupons] = useState(new BigNumber(0));

  const [pairBalanceSSD, setPairBalanceSSD] = useState(new BigNumber(0));
  const [pairBalanceUSDC, setPairBalanceUSDC] = useState(new BigNumber(0));
  const [price0, setPrice0] = useState(new BigNumber(0));
  const [blockTimestampLast, setBlockTimestampLast] = useState(0);

  const price = pairBalanceUSDC.dividedBy(pairBalanceSSD);

  useEffect(() => {
    let isCancelled = false;

    async function getTool() {
      const poolAddressStr = await getPoolAddress();

      const [
        epochStr,

        pairBalanceSSDStr,
        pairBalanceUSDCStr,

        totalSupplyStr,
        totalBondedStr,
        totalStagedStr,
        totalSupplyUniStr,
        poolTotalBondedStr,
        poolTotalStagedStr,
        totalRedeemableStr,
        totalDebtStr,
        totalCouponsStr,
        price0Str,
        reserves
      ] = await Promise.all([
        getEpoch(SSDS.addr),

        getTokenBalance(SSD.addr, UNI.addr),
        getTokenBalance(USDC.addr, UNI.addr),

        getTokenTotalSupply(SSD.addr),
        getTotalBonded(SSDS.addr),
        getTotalStaged(SSDS.addr),
        getTotalSupplyUni(),
        getPoolTotalBonded(poolAddressStr),
        getPoolTotalStaged(poolAddressStr),

        getTotalRedeemable(SSDS.addr),
        getTotalDebt(SSDS.addr),
        getTotalCoupons(SSDS.addr),
        getPrice0CumulativeLast(),
        getReserves(),
      ]);

      if (!isCancelled) {
        const {_blockTimestampLast} = reserves;

        setEpoch(parseInt(epochStr, 10));

        setPairBalanceSSD(toTokenUnitsBN(pairBalanceSSDStr, SSD.decimals));
        setPairBalanceUSDC(toTokenUnitsBN(pairBalanceUSDCStr, USDC.decimals));

        setTotalSupply(toTokenUnitsBN(totalSupplyStr, SSD.decimals));
        setTotalBonded(toTokenUnitsBN(totalBondedStr, SSD.decimals));
        setTotalStaged(toTokenUnitsBN(totalStagedStr, SSD.decimals));
        setTotalRedeemable(toTokenUnitsBN(totalRedeemableStr, SSD.decimals));
        setTotalSupplyUni(toTokenUnitsBN(totalSupplyUniStr, SSD.decimals));
        setPoolTotalBonded(toTokenUnitsBN(poolTotalBondedStr, SSD.decimals));
        setPoolTotalStaged(toTokenUnitsBN(poolTotalStagedStr, SSD.decimals));
        setTotalDebt(toTokenUnitsBN(totalDebtStr, SSD.decimals));
        setTotalCoupons(toTokenUnitsBN(totalCouponsStr, SSD.decimals));
        setPrice0(toTokenUnitsBN(price0Str, USDC.decimals));
        setBlockTimestampLast(_blockTimestampLast);
      }
    }

    getTool();
    const id = setInterval(getTool, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, []);

  const increaseBy = (totalSupply.toNumber() * 4) / 100;
  const daoBonding = (((totalSupply.toNumber() * 4) / 100) * 60) / 100;
  const lpBonding = (((totalSupply.toNumber() * 4) / 100) * 40) / 100;

  return <Container>
    <Header>
      Next Epoch:
      <p>$SSD Supply will increase by {increaseBy.toFixed(2)} SSD </p>
      <p>{daoBonding.toFixed(2)} SSD for DAO Bonding and {lpBonding.toFixed(2)} SSD for LP Bonding</p>
    </Header>
    <ContainerItem>
      <NextEpoch/>
      <div>
        <Title>Spot Price</Title>
        <p>${price.toNumber().toFixed(2)} USDC</p>
      </div>
      <div>
        <Title>TWAP Price</Title>
        <p>N/A (Bootstrapping price - $1.44)</p>
      </div>
      <div>
        <Title>Epoch</Title>
        <p>{epoch}</p>
      </div>
    </ContainerItem>
    <ContainerItem>
      <div style={{flexBasis: '48%', maxWidth: 300}}>
        <Title>Token Supply</Title>
        <ContainerFlex>
          <div>
            <p>Total Token:</p>
            <p>Coupons:</p>
            <p>Total Supply:</p>
            <p>Debt:</p>
          </div>
          <div className="text-right">
            <p>{(totalSupply.toNumber() - totalCoupons.toNumber()).toFixed(2)}</p>
            <p>{totalCoupons.toNumber().toFixed(2)}</p>
            <p>{totalSupply.toNumber().toFixed(2)}</p>
            <p>{totalDebt.toNumber().toFixed(2)}</p>
          </div>
        </ContainerFlex>
      </div>
      <div style={{flexBasis: '48%', maxWidth: 300}}>
        <TokenDistribution
          totalRedeemable={totalRedeemable}
          totalStaged={totalStaged}
          totalBonded={totalBonded}
          totalSupplyUni={totalSupplyUni}
          poolTotalStaged={poolTotalStaged}
          poolTotalBonded={poolTotalBonded}
        />
      </div>
    </ContainerItem>
    <HistoryReturn
      totalSupply={totalSupply}
      totalBonded={totalBonded}
      SSDLPBonded={pairBalanceSSD}
    />
  </Container>
}

const Header = styled.div`
  text-align: center;
`

const Container = styled.div`
  padding: 1% 15px 1% 15px;
  max-width: 800px;
  margin: 20px auto 0 auto;
`

const ContainerItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
  @media (max-width: 522px) {
    display: block;
  }
`

const ContainerFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Title = styled.h2`
  font-weight: bold;
`

export default Tool;