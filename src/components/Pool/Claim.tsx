import React, {useState} from 'react';
import {
  Box, Button, IconArrowDown
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

import {
  BalanceBlock, MaxButton,
} from '../common/index';
import {claimPool} from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import {SSD} from "../../constants/tokens";
import BigNumberInput from "../common/BigNumberInput";

type ClaimProps = {
  poolAddress: string
  claimable: BigNumber,
  status: number
};

function Claim({
                 poolAddress, claimable, status
               }: ClaimProps) {
  const [claimAmount, setClaimAmount] = useState(new BigNumber(0));

  return (
    <Box heading="Claim">
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {/* total Issued */}
        <div style={{flexBasis: '32%'}}>
          <BalanceBlock asset="Claimable" balance={claimable} suffix={"SSD"}/>
        </div>
        {/* Deposit UNI-V2 into Pool */}
        <div style={{flexBasis: '35%'}}/>
        <div style={{flexBasis: '33%', paddingTop: '2%'}}>
          <div style={{display: 'flex'}}>
            <div style={{width: '60%', minWidth: '6em'}}>
              <>
                <BigNumberInput
                  adornment="SSD"
                  value={claimAmount}
                  setter={setClaimAmount}
                  disabled={status !== 0}
                />
                <MaxButton
                  onClick={() => {
                    setClaimAmount(claimable);
                  }}
                />
              </>
            </div>
            <div style={{width: '40%', minWidth: '6em'}}>
              {
                (poolAddress === '' || status !== 0 || !isPos(claimAmount))
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
                        icon={<IconArrowDown/>}
                        label="Claim"
                        disabled={poolAddress === '' || status !== 0 || !isPos(claimAmount)}
                      />
                    </div>
                  </OverlayTrigger>
                  : <Button
                    wide
                    icon={<IconArrowDown/>}
                    label="Claim"
                    onClick={() => {
                      claimPool(
                        poolAddress,
                        toBaseUnitBN(claimAmount, SSD.decimals),
                        (hash) => setClaimAmount(new BigNumber(0))
                      );
                    }}
                  />
              }
            </div>
          </div>
        </div>
      </div>
      <div style={{width: '100%', paddingTop: '2%', textAlign: 'center'}}>
        <span style={{opacity: 0.5}}> Claiming claimable SSD requires your status as Unlocked </span>
      </div>
    </Box>
  );
}

export default Claim;
