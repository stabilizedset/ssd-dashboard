import React, {useState} from 'react';
import {
  Box, Button, IconArrowDown, IconCircleMinus,
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {
  BalanceBlock,
} from '../common/index';
import {claimPool, unbondPool, withdrawPool} from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import {SSD, UNI} from "../../constants/tokens";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

type MigrateProps = {
  legacyPoolAddress: string,
  staged: BigNumber,
  claimable: BigNumber,
  bonded: BigNumber,
  status: number,
  isRewardNegative: boolean,
};

function Migrate({
                   legacyPoolAddress, staged, claimable, bonded, status, isRewardNegative
                 }: MigrateProps) {
  const [unbonded, setUnbonded] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);
  const [claimed, setClaimed] = useState(false);

  return (
    <Box heading="Migrate">
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {/* Unbond UNI-V2 within Pool */}
        <div style={{flexBasis: '32%', paddingTop: '2%'}}>
          <div style={{display: 'flex'}}>
            <div style={{width: '60%'}}>
              <BalanceBlock asset="Bonded" balance={bonded} suffix={"UNI-V2"}/>
              {
                (legacyPoolAddress === '' || !isPos(bonded) || unbonded || isRewardNegative)
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
                        icon={<IconCircleMinus/>}
                        label="Unbond"
                        disabled={legacyPoolAddress === '' || !isPos(bonded) || unbonded || isRewardNegative}
                      />
                    </div>
                  </OverlayTrigger>
                  : <Button
                    wide
                    icon={<IconCircleMinus/>}
                    label="Unbond"
                    onClick={() => {
                      unbondPool(
                        legacyPoolAddress,
                        toBaseUnitBN(bonded, UNI.decimals),
                        (hash) => setUnbonded(hash.length > 0)
                      );
                    }}
                  />
              }
            </div>
          </div>
        </div>
        {/* Withdraw UNI-V2 within Pool */}
        <div style={{flexBasis: '32%', paddingTop: '2%'}}>
          <div style={{display: 'flex'}}>
            <div style={{width: '60%'}}>
              <BalanceBlock asset="Staged" balance={staged} suffix={"UNI-V2"}/>
              {
                (legacyPoolAddress === '' || !isPos(staged) || withdrawn || status !== 0)
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
                        icon={<IconCircleMinus/>}
                        label="Withdraw"
                        disabled={legacyPoolAddress === '' || !isPos(staged) || withdrawn || status !== 0}
                      />
                    </div>
                  </OverlayTrigger>
                  : <Button
                    wide
                    icon={<IconCircleMinus/>}
                    label="Withdraw"
                    onClick={() => {
                      withdrawPool(
                        legacyPoolAddress,
                        toBaseUnitBN(staged, UNI.decimals),
                        (hash) => setWithdrawn(hash.length > 0)
                      );
                    }}
                  />
              }
            </div>
          </div>
        </div>
        {/* Claim SSD within Pool */}
        <div style={{flexBasis: '32%', paddingTop: '2%'}}>
          <div style={{display: 'flex'}}>
            <div style={{width: '60%'}}>
              <BalanceBlock asset="Claimable" balance={claimable} suffix={"SSD"}/>
              <Button
                wide
                icon={<IconArrowDown/>}
                label="Claim"
                onClick={() => {
                  claimPool(
                    legacyPoolAddress,
                    toBaseUnitBN(claimable, SSD.decimals),
                    (hash) => setClaimed(hash.length > 0)
                  );
                }}
                disabled={legacyPoolAddress === '' || !isPos(claimable) || claimed || status !== 0}
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Migrate;
