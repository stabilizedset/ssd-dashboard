import React, {useState} from 'react';
import styled from 'styled-components'
import {
  Button, IconCirclePlus, IconArrowUp
} from '@aragon/ui';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import BigNumber from "bignumber.js";

import {BalanceBlock, MaxButton} from "../common";
import {MAX_UINT256} from "../../constants/values";
import BigNumberInput from "../common/BigNumberInput";
import {isPos} from "../../utils/number";


type ZapUniProps = {
  user: string
  balance: BigNumber,
  code: string,
  zapAllowance: BigNumber,
  onApprove: Function,
  onBuyUni: Function,
};

const ZapUni = ({balance, code, zapAllowance, user, onApprove, onBuyUni}: ZapUniProps) => {
  const [amount, setAmount] = useState(new BigNumber(0));

  const onChangeAmount = (amount) => {
    setAmount(amount);
  };

  return (
    <Container>
      <div style={{flex: 1}}>
        <BalanceBlock asset={`${code} Balance`} balance={balance} suffix={code}/>
      </div>
      {
        zapAllowance.comparedTo(MAX_UINT256.dividedBy(2)) > 0
          ? <div style={{display: 'flex'}}>
            <div style={{width: '60%', minWidth: '6em'}}>
              <BigNumberInput
                adornment={code}
                value={amount}
                setter={onChangeAmount}
              />
              <MaxButton
                onClick={() => {
                  onChangeAmount(balance);
                }}
                title="Max"
              />
            </div>
            <div style={{width: '40%', minWidth: '6em'}}>
              {
                (!isPos(amount) || amount.isGreaterThan(balance))
                  ? <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip">
                        Make sure the value &gt; 0
                      </Tooltip>
                    }
                  >
                    <div style={{display: 'inline-block', cursor: 'not-allowed'}}>
                      <Button
                        style={{pointerEvents: 'none'}}
                        wide
                        icon={<IconArrowUp/>}
                        label="Get UNI-V2"
                        disabled
                      />
                    </div>
                  </OverlayTrigger>
                  : <Button
                    wide
                    icon={<IconArrowUp/>}
                    label="Get UNI-V2"
                    onClick={() => onBuyUni(amount)}
                  />
              }
            </div>
          </div>
          : <Button
            style={{flex: 1}}
            className="mt-2"
            wide
            icon={<IconCirclePlus/>}
            label={`Approve ${code}`}
            onClick={onApprove}
            disabled={user === ''}
          />
      }
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  width: 100%;
  //@media (max-width: 568px) {
  //  flex: none;
  //}
`

export default ZapUni;