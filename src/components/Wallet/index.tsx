import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BigNumber from 'bignumber.js';
import {
  getBalanceBonded,
  getBalanceOfStaged, getFluidUntil, getLockedUntil,
  getStatusOf, getTokenAllowance,
  getTokenBalance, getTokenTotalSupply,
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

  //Update User balances
  useEffect(() => {
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
    let isCancelled = false;

    async function updateUserInfo() {
      const [
        ssdBalance, ssdAllowance, ssdsBalance, ssdsSupply, stagedBalance, bondedBalance, status, poolAddress,
        fluidUntilStr, lockedUntilStr
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
        getLockedUntil(SSDS.addr, user),
      ]);

      const userSSDBalance = toTokenUnitsBN(ssdBalance, SSD.decimals);
      const userSSDSBalance = toTokenUnitsBN(ssdsBalance, SSDS.decimals);
      const totalSSDSSupply = toTokenUnitsBN(ssdsSupply, SSDS.decimals);
      const userStagedBalance = toTokenUnitsBN(stagedBalance, SSDS.decimals);
      const userBondedBalance = toTokenUnitsBN(bondedBalance, SSDS.decimals);
      const userStatus = parseInt(status, 10);
      const fluidUntil = parseInt(fluidUntilStr, 10);
      const lockedUntil = parseInt(lockedUntilStr, 10);

      if (!isCancelled) {
        setUserSSDBalance(new BigNumber(userSSDBalance));
        setUserSSDAllowance(new BigNumber(ssdAllowance));
        setUserSSDSBalance(new BigNumber(userSSDSBalance));
        setTotalSSDSSupply(new BigNumber(totalSSDSSupply));
        setUserStagedBalance(new BigNumber(userStagedBalance));
        setUserBondedBalance(new BigNumber(userBondedBalance));
        setUserStatus(userStatus);
        setUserStatusUnlocked(Math.max(fluidUntil, lockedUntil))
        setLockup(poolAddress === DollarPool4 ? DAO_EXIT_LOCKUP_EPOCHS : 1);
      }
    }
    updateUserInfo();
    const id = setInterval(updateUserInfo, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  return (
    <>
      <IconHeader icon={<i className="fas fa-dot-circle"/>} text="DAO"/>

      <AccountPageHeader
        accountSSDBalance={userSSDBalance}
        accountSSDSBalance={userSSDSBalance}
        totalSSDSSupply={totalSSDSSupply}
        accountStagedBalance={userStagedBalance}
        accountBondedBalance={userBondedBalance}
        accountStatus={userStatus}
        unlocked={userStatusUnlocked}
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
