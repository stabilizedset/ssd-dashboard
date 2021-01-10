import React, {useEffect, useState} from 'react';
import BigNumber from "bignumber.js";
import {
  getTokenAllowance,
  getTokenBalance,
} from "../../utils/infura";
import {UNI, ZAP_PIPE, UNI_DSD_USDC} from "../../constants/tokens";
import {toTokenUnitsBN} from "../../utils/number";
import Migrate from "./Migrate";
import IconHeader from "../common/IconHeader";

const initState = new BigNumber(0);

const GetUni = ({user}: { user: string }) => {
  const [zapUniESDAllowance, setZapUniESDAllowance] = useState(initState);
  const [zapUniDSDAllowance, setZapUniDSDAllowance] = useState(initState);
  const [univ2SSDBalance, setUniv2Balance] = useState(initState);
  const [univ2ESDBalance, setUniv2ESDBalance] = useState(initState);
  const [univ2DSDBalance, setUniv2DSDBalance] = useState(initState);

  //Update User balances
  useEffect(() => {
    if (user === '') {
      setZapUniESDAllowance(initState);
      setZapUniDSDAllowance(initState);
      setUniv2Balance(initState);
      setUniv2ESDBalance(initState);
      setUniv2DSDBalance(initState);
      return;
    }
    let isCancelled = false;

    async function updateUserInfo() {
      const [
        zapUniESDAllowance,
        zapUniDSDAllowance,
        uniSSDBalanceStr,
        uniESDBalanceStr,
        uniDSDBalanceStr,
      ] = await Promise.all([
        getTokenAllowance(UNI_DSD_USDC.addr, user, ZAP_PIPE.addr),
        getTokenAllowance(UNI_DSD_USDC.addr, user, ZAP_PIPE.addr),
        getTokenBalance(UNI.addr, user),
        getTokenBalance(UNI_DSD_USDC.addr, user),
        getTokenBalance(UNI_DSD_USDC.addr, user),
      ]);

      if (!isCancelled) {
        setZapUniESDAllowance(new BigNumber(zapUniESDAllowance));
        setZapUniDSDAllowance(new BigNumber(zapUniDSDAllowance));
        setUniv2Balance(new BigNumber(toTokenUnitsBN(uniSSDBalanceStr, UNI.decimals)));
        setUniv2ESDBalance(new BigNumber(toTokenUnitsBN(uniESDBalanceStr, UNI.decimals)));
        setUniv2DSDBalance(new BigNumber(toTokenUnitsBN(uniDSDBalanceStr, UNI.decimals)));
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
      <IconHeader icon={<i className="fas fa-parachute-box"/>} text="Get UNI-V2"/>

      <Migrate
        user={user}
        zapUniESDAllowance={zapUniESDAllowance}
        zapUniDSDAllowance={zapUniDSDAllowance}
        balanceUni={univ2SSDBalance}
        balanceUniESD={univ2ESDBalance}
        balanceUniDSD={univ2DSDBalance}
      />
    </>
  );
};

export default GetUni;