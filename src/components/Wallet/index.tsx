import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BigNumber from 'bignumber.js';
import {
  getBalanceBonded,
  getBalanceOfStaged, getFluidUntil,
  getStatusOf, getTokenAllowance,
  getTokenBalance, getTokenTotalSupply, getTotalBonded, loadFluidStatusDao,
} from '../../utils/infura';
import {SSD, SSDS} from "../../constants/tokens";
import {DAO_EXIT_LOCKUP_EPOCHS} from "../../constants/values";
import { toTokenUnitsBN } from '../../utils/number';

import AccountPageHeader from "./Header";
import WithdrawDeposit from "./WithdrawDeposit";
import BondUnbond from "./BondUnbond";
import IconHeader from "../common/IconHeader";
import {getPoolAddress} from "../../utils/pool";
import {DollarPool4} from "../../constants/contracts";
import Invest from "./Invest";

function Wallet({ user }: {user: string}) {
  const { override } = useParams();
  if (override) {
    user = override;
  }

  const [userSSDBalance, setUserSSDBalance] = useState(new BigNumber(0));
  const [userSSDAllowance, setUserSSDAllowance] = useState(new BigNumber(0));
  const [userSSDSBalance, setUserSSDSBalance] = useState(new BigNumber(0));
  const [totalSSDSSupply, setTotalSSDSSupply] = useState(new BigNumber(0));
  const [userStagedBalance, setUserStagedBalance] = useState(new BigNumber(0));
  const [userBondedBalance, setUserBondedBalance] = useState(new BigNumber(0));
  const [userStatus, setUserStatus] = useState(0);
  const [userStatusUnlocked, setUserStatusUnlocked] = useState(0);
  const [lockup, setLockup] = useState(0);
  const [totalSupply, setTotalSupply] = useState(new BigNumber(0));
  const [totalBonded, setTotalBonded] = useState(new BigNumber(0));
  const [fluidStatus, setFluidStatus] = useState({
    lastUnbond: undefined, lastBond: undefined, fluidEpoch: undefined
  });

  //Update User balances
  useEffect(() => {
    let isCancelledApr = false;
    async function updateAPR() {
      const [
        totalSupplyStr,
        totalBondedStr,
      ] = await Promise.all([
        getTokenTotalSupply(SSD.addr),
        getTotalBonded(SSDS.addr),
      ]);

      if (!isCancelledApr) {
        setTotalSupply(toTokenUnitsBN(totalSupplyStr, SSD.decimals));
        setTotalBonded(toTokenUnitsBN(totalBondedStr, SSD.decimals));
      }
    }

    updateAPR();

    if (user === '') {
      setUserSSDBalance(new BigNumber(0));
      setUserSSDAllowance(new BigNumber(0));
      setUserSSDSBalance(new BigNumber(0));
      setTotalSSDSSupply(new BigNumber(0));
      setUserStagedBalance(new BigNumber(0));
      setUserBondedBalance(new BigNumber(0));
      setUserStatus(0);
      return;
    }
    let isCancelledUser = false;

    async function updateUserInfo() {
      const [
        SSDBalance,
        SSDAllowance,
        SSDsBalance,
        SSDsSupply,
        stagedBalance,
        bondedBalance,
        status,
        poolAddress,
        fluidUntilStr,
        totalSupplyStr,
        totalBondedStr,
        fluidStatusStr
      ] = await Promise.all([
        getTokenBalance(SSD.addr, user),
        getTokenAllowance(SSD.addr, user, SSDS.addr),
        getTokenBalance(SSDS.addr, user),
        getTokenTotalSupply(SSDS.addr),
        getBalanceOfStaged(SSDS.addr, user),
        getBalanceBonded(SSDS.addr, user),
        getStatusOf(SSDS.addr, user),
        getPoolAddress(),

        getFluidUntil(SSDS.addr, user),

        getTokenTotalSupply(SSD.addr),
        getTotalBonded(SSDS.addr),
        loadFluidStatusDao(SSDS.addr, user),
      ]);

      const userSSDBalance = toTokenUnitsBN(SSDBalance, SSD.decimals);
      const userSSDSBalance = toTokenUnitsBN(SSDsBalance, SSDS.decimals);
      const totalSSDSSupply = toTokenUnitsBN(SSDsSupply, SSDS.decimals);
      const userStagedBalance = toTokenUnitsBN(stagedBalance, SSDS.decimals);
      const userBondedBalance = toTokenUnitsBN(bondedBalance, SSDS.decimals);
      const userStatus = parseInt(status, 10);
      const fluidUntil = parseInt(fluidUntilStr, 10);

      if (!isCancelledUser) {
        setUserSSDBalance(new BigNumber(userSSDBalance));
        setUserSSDAllowance(new BigNumber(SSDAllowance));
        setUserSSDSBalance(new BigNumber(userSSDSBalance));
        setTotalSSDSSupply(new BigNumber(totalSSDSSupply));
        setUserStagedBalance(new BigNumber(userStagedBalance));
        setUserBondedBalance(new BigNumber(userBondedBalance));
        setUserStatus(userStatus);
        setUserStatusUnlocked(fluidUntil)
        setLockup(poolAddress === DollarPool4 ? DAO_EXIT_LOCKUP_EPOCHS : 1);
        setTotalSupply(toTokenUnitsBN(totalSupplyStr, SSD.decimals));
        setTotalBonded(toTokenUnitsBN(totalBondedStr, SSD.decimals));
        setFluidStatus(fluidStatusStr);
      }
    }
    updateUserInfo();
    const updateUser = setInterval(updateUserInfo, 15000);
    const apr = setInterval(updateAPR, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelledUser = true;
      isCancelledApr = true;
      clearInterval(updateUser);
      clearInterval(apr);
    };
  }, [user]);

  return (
    <>
      <IconHeader icon={<i className="fas fa-dot-circle"/>} text="DAO"/>

      <Invest
        totalSupply={totalSupply}
        totalBonded={totalBonded}
      />

      <AccountPageHeader
        user={user}
        accountSSDBalance={userSSDBalance}
        accountSSDSBalance={userSSDSBalance}
        totalSSDSSupply={totalSSDSSupply}
        accountStagedBalance={userStagedBalance}
        accountBondedBalance={userBondedBalance}
        accountStatus={userStatus}
        unlocked={userStatusUnlocked}
        fluidEpoch={fluidStatus?.fluidEpoch}
      />

      <WithdrawDeposit
        user={user}
        balance={userSSDBalance}
        allowance={userSSDAllowance}
        stagedBalance={userStagedBalance}
        status={userStatus}
      />

      <BondUnbond
        staged={userStagedBalance}
        bonded={userBondedBalance}
        status={userStatus}
        lockup={lockup}
      />
    </>
  );
}

export default Wallet;
