import React, {Fragment} from 'react';
import BigNumber from 'bignumber.js';
import {Button} from '@aragon/ui';
import styled from 'styled-components'

import {BalanceBlock} from '../common/index';
import TextBlock from "../common/TextBlock";
import {ownership} from "../../utils/number";
import {UNISWAP_SUPPLY} from "../../constants/contracts";

type PoolPageHeaderProps = {
  accountUNIBalance: BigNumber,
  accountBondedBalance: BigNumber,
  accountRewardedSSDBalance: BigNumber,
  accountClaimableSSDBalance: BigNumber,
  poolTotalBonded: BigNumber,
  accountPoolStatus: number,
  unlocked: number,
  fluidEpoch: any,
  user: string
};

const STATUS_MAP = ["Unlocked", "Locked"];

function status(accountStatus) {
  return STATUS_MAP[accountStatus]
}

const PoolPageHeader = ({
                          accountUNIBalance,
                          accountBondedBalance,
                          accountRewardedSSDBalance,
                          accountClaimableSSDBalance,
                          poolTotalBonded,
                          accountPoolStatus,
                          unlocked,
                          fluidEpoch,
                          user
                        }: PoolPageHeaderProps) => (
  <Container>
    <div>
      <BalanceBlock asset="Balance" balance={accountUNIBalance} suffix={" UNI-V2"}/>
      <Button
        label="Get UNI-V2 Manually"
        icon={<i className="fas fa-exchange-alt"/>}
        onClick={() => window.open(UNISWAP_SUPPLY, "_blank")}
      />
    </div>
    <div>
      <BalanceBlock asset="Rewarded" balance={accountRewardedSSDBalance} suffix={" SSD"}/>
    </div>
    <div>
      <BalanceBlock asset="Claimable" balance={accountClaimableSSDBalance} suffix={" SSD"}/>
    </div>
    <div>
      <BalanceBlock asset="Pool Ownership" balance={ownership(accountBondedBalance, poolTotalBonded)} suffix={"%"}/>
    </div>
    <div>
      <TextBlock label="Pool Status" text={status(accountPoolStatus)}/>
      {
        user !== '' && (
          <Fragment>
            <p>{
              isNaN(fluidEpoch)
                ? 'You did not bonded or unbonded before.'
                : `You last bonded or unbonded at epoch ${fluidEpoch}.`
            } </p>
            {
              accountPoolStatus !== 0 && (
                <p>Unlocked at epoch {fluidEpoch + 24}.</p>
              )
            }
          </Fragment>
        )
      }
    </div>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2%;
  justify-content: space-between;
  @media (max-width: 522px) {
    display: block;
  }
`

export default PoolPageHeader;
