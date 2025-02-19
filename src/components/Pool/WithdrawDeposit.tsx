import React, {useState} from 'react';
import {
  Box, Button, IconCirclePlus, IconCircleMinus, IconLock
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

import {
  BalanceBlock, MaxButton,
} from '../common/index';
import {approve, depositPool, withdrawPool} from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import {UNI} from "../../constants/tokens";
import {MAX_UINT256} from "../../constants/values";
import BigNumberInput from "../common/BigNumberInput";

type WithdrawDepositProps = {
  poolAddress: string
  user: string
  balance: BigNumber,
  allowance: BigNumber,
  stagedBalance: BigNumber,
  status: number
};

function WithdrawDeposit({
                           poolAddress, user, balance, allowance, stagedBalance, status
                         }: WithdrawDepositProps) {
  const [depositAmount, setDepositAmount] = useState(new BigNumber(0));
  const [withdrawAmount, setWithdrawAmount] = useState(new BigNumber(0));

  return (
    <Box heading="Stage">
      {allowance.comparedTo(MAX_UINT256) === 0 ?
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {/* total Issued */}
          <div style={{flexBasis: '32%'}}>
            <BalanceBlock asset="Staged" balance={stagedBalance} suffix={"UNI-V2"}/>
          </div>
          {/* Deposit UNI-V2 into Pool */}
          <div style={{flexBasis: '33%', paddingTop: '2%'}}>
            <div style={{display: 'flex'}}>
              <div style={{width: '60%', minWidth: '6em'}}>
                <>
                  <BigNumberInput
                    adornment="UNI-V2"
                    value={depositAmount}
                    setter={setDepositAmount}
                    disabled={status !== 0}
                  />
                  <MaxButton
                    onClick={() => {
                      setDepositAmount(balance);
                    }}
                  />
                </>
              </div>
              <div style={{width: '40%', minWidth: '7em'}}>
                {
                  (poolAddress === '' || status !== 0 || !isPos(depositAmount))
                    ? <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="tooltip">
                          Make sure the value &gt; 0 and your status is Unlocked.
                        </Tooltip>
                      }
                    >
                      <div style={{display: 'inline-block', cursor: 'not-allowed'}}>
                        <Button
                          style={{pointerEvents: 'none'}}
                          wide
                          icon={status === 0 ? <IconCirclePlus/> : <IconLock/>}
                          label="Deposit"
                          disabled={poolAddress === '' || status !== 0 || !isPos(depositAmount)}
                        />
                      </div>
                    </OverlayTrigger>
                    : <Button
                      wide
                      icon={status === 0 ? <IconCirclePlus/> : <IconLock/>}
                      label="Deposit"
                      onClick={() => {
                        depositPool(
                          poolAddress,
                          toBaseUnitBN(depositAmount, UNI.decimals),
                          (hash) => setDepositAmount(new BigNumber(0))
                        );
                      }}
                    />
                }
              </div>
            </div>
          </div>
          <div style={{flexBasis: '2%'}}/>
          {/* Withdraw SSD from DAO */}
          <div style={{flexBasis: '33%', paddingTop: '2%'}}>
            <div style={{display: 'flex'}}>
              <div style={{width: '60%', minWidth: '6em'}}>
                <>
                  <BigNumberInput
                    adornment="UNI-V2"
                    value={withdrawAmount}
                    setter={setWithdrawAmount}
                    disabled={status !== 0}
                  />
                  <MaxButton
                    onClick={() => {
                      setWithdrawAmount(stagedBalance);
                    }}
                  />
                </>
              </div>
              <div style={{width: '40%', minWidth: '7em'}}>
                {
                  (poolAddress === '' || status !== 0 || !isPos(withdrawAmount))
                    ? <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="tooltip">
                          Make sure the value &gt; 0 and your status is Unlocked.
                        </Tooltip>
                      }
                    >
                      <div style={{display: 'inline-block', cursor: 'not-allowed'}}>
                        <Button
                          style={{pointerEvents: 'none'}}
                          wide
                          icon={status === 0 ? <IconCircleMinus/> : <IconLock/>}
                          label="Withdraw"
                          disabled={poolAddress === '' || status !== 0 || !isPos(withdrawAmount)}
                        />
                      </div>
                    </OverlayTrigger>
                    : <Button
                      wide
                      icon={status === 0 ? <IconCircleMinus/> : <IconLock/>}
                      label="Withdraw"
                      onClick={() => {
                        withdrawPool(
                          poolAddress,
                          toBaseUnitBN(withdrawAmount, UNI.decimals),
                          (hash) => setWithdrawAmount(new BigNumber(0))
                        );
                      }}
                    />
                }
              </div>
            </div>
          </div>
        </div>
        :
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {/* total Issued */}
          <div style={{flexBasis: '32%'}}>
            <BalanceBlock asset="Staged" balance={stagedBalance} suffix={"UNI-V2"}/>
          </div>
          <div style={{flexBasis: '35%'}}/>
          {/* Approve Pool to spend UNI-V2 */}
          <div style={{flexBasis: '33%', paddingTop: '2%'}}>
            <Button
              wide
              icon={<IconCirclePlus/>}
              label="Approve"
              onClick={() => {
                approve(UNI.addr, poolAddress);
              }}
              disabled={poolAddress === '' || user === ''}
            />
          </div>
        </div>
      }
      <div style={{width: '100%', paddingTop: '2%', textAlign: 'center'}}>
        <span style={{opacity: 0.5}}>Staging requires your status as Unlocked.</span>
      </div>
    </Box>
  );
}

export default WithdrawDeposit;
