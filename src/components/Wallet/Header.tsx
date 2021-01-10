import React, {Fragment} from 'react';
import BigNumber from 'bignumber.js';
import {Button} from '@aragon/ui';
import styled from 'styled-components'

import {BalanceBlock} from '../common/index';
import TextBlock from "../common/TextBlock";
import {ownership} from "../../utils/number";
import {UNISWAP_TRADE} from "../../constants/contracts";

type AccountPageHeaderProps = {
  accountSSDBalance: BigNumber,
  accountSSDSBalance: BigNumber,
  totalSSDSSupply: BigNumber,
  accountStagedBalance: BigNumber,
  accountBondedBalance: BigNumber,
  accountStatus: number,
  unlocked: number,
  fluidEpoch: any,
  user: string
};

const STATUS_MAP = ["Unlocked", "Locked", "Locked"];

function status(accountStatus) {
  return STATUS_MAP[accountStatus]
}

const AccountPageHeader = ({
                             accountSSDBalance,
                             accountSSDSBalance,
                             totalSSDSSupply,
                             accountStagedBalance,
                             accountBondedBalance,
                             accountStatus,
                             unlocked,
                             fluidEpoch,
                             user
                           }: AccountPageHeaderProps) => {

  return (
    <Container>
      <div>
        <BalanceBlock asset="Balance" balance={accountSSDBalance} suffix={" SSD"}/>
        <Button
          label="Buy SSD"
          icon={<i className="fas fa-exchange-alt"/>}
          onClick={() => window.open(UNISWAP_TRADE, "_blank")}
        />
      </div>
      <div>
        <BalanceBlock asset="Staged" balance={accountStagedBalance} suffix={" SSD"}/>
      </div>
      <div>
        <BalanceBlock asset="Bonded" balance={accountBondedBalance} suffix={" SSD"}/>
      </div>
      <div>
        <BalanceBlock asset="DAO Ownership" balance={ownership(accountSSDSBalance, totalSSDSSupply)} suffix={"%"}/>
      </div>
      <div>
        <TextBlock label="Status" text={status(accountStatus)}/>
        {
          user !== '' && (
            <Fragment>
              <p>{
                isNaN(fluidEpoch)
                  ? 'You did not bonded or unbonded before.'
                  : `You last bonded or unbonded at epoch ${fluidEpoch}.`
              } </p>
              {
                accountStatus !== 0 && (
                  <p>Unlocked at epoch {fluidEpoch + 24}.</p>
                )
              }
            </Fragment>
          )
        }
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2%;
  justify-content: space-between;
  @media (max-width: 522px) {
    display: block;
  }
`


export default AccountPageHeader;
