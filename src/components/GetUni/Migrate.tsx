import React, {useState} from 'react';
import BigNumber from "bignumber.js";
import styled from 'styled-components'
import {
  Box, Button, IconCirclePlus, IconArrowUp
} from '@aragon/ui';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

import {BalanceBlock, MaxButton} from "../common";
import {MAX_UINT256} from "../../constants/values";
import BigNumberInput from "../common/BigNumberInput";
import {isPos, toBaseUnitBN} from "../../utils/number";
import {migrateUniV2} from "../../utils/infura";
import {UNI_DSD_USDC, ZAP_PIPE, UNI} from "../../constants/tokens";
import {approvePairDSD} from "../../utils/web3";

type MigrateProps = {
  user: string
  zapUniESDAllowance: BigNumber,
  zapUniDSDAllowance: BigNumber,
  balanceUni: BigNumber,
  balanceUniESD: BigNumber,
  balanceUniDSD: BigNumber,
};

const Migrate = ({
                   user,
                   zapUniESDAllowance,
                   zapUniDSDAllowance,
                   balanceUni,
                   balanceUniDSD,
                   balanceUniESD
                 }: MigrateProps) => {
  const [amountESD, setAmountESD] = useState(new BigNumber(0));
  const [amountDSD, setAmountDSD] = useState(new BigNumber(0));

  const onChangeAmountESD = (amount) => {
    setAmountESD(amount);
  };

  const onChangeAmountDSD = (amount) => {
    setAmountDSD(amount);
  };

  return (
    <Box heading="Migrate">
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <div style={{flexBasis: '32%'}}>
          <BalanceBlock asset="Balance" balance={balanceUni} suffix={"UNI-V2"}/>
        </div>
        <Container>
          <div>
            <BalanceBlock asset="UNI-V2 ESD-USDC Balance" balance={balanceUniESD} suffix={"UNI-V2"}/>
            <BalanceBlock asset="UNI-V2 DSD-USDC Balance" balance={balanceUniDSD} suffix={"UNI-V2"}/>
          </div>
          <div className="d-flex flex-column justify-content-between">
            {
              zapUniESDAllowance.comparedTo(MAX_UINT256.dividedBy(2)) > 0
                ? <div style={{display: 'flex'}}>
                  <div style={{width: '60%', minWidth: '6em'}}>
                    <BigNumberInput
                      adornment="ESD"
                      value={amountESD}
                      setter={onChangeAmountESD}
                    />
                    {/*<PriceSection label="Requires " amt={usdcAmount} symbol=" USDC"/>*/}
                    <MaxButton
                      onClick={() => {
                        onChangeAmountESD(balanceUniESD);
                      }}
                      title="Max"
                    />
                  </div>
                  <div style={{width: '40%', minWidth: '6em'}}>
                    {
                      (!isPos(amountESD) || amountESD.isGreaterThan(balanceUniESD))
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
                          onClick={() => migrateUniV2(user, toBaseUnitBN(amountESD, UNI_DSD_USDC.decimals), UNI_DSD_USDC.addr)}
                        />
                    }
                  </div>
                </div>
                : <Button
                  wide
                  icon={<IconCirclePlus/>}
                  label="Approve UNI-V2 ESD"
                  onClick={() => {
                    approvePairDSD(UNI_DSD_USDC.addr, ZAP_PIPE.addr);
                  }}
                  disabled={user === ''}
                />
            }
            {
              zapUniDSDAllowance.comparedTo(MAX_UINT256.dividedBy(2)) > 0
                ? <div style={{display: 'flex'}}>
                  <div style={{width: '60%', minWidth: '6em'}}>
                    <BigNumberInput
                      adornment="ESD"
                      value={amountDSD}
                      setter={onChangeAmountDSD}
                    />
                    {/*<PriceSection label="Requires " amt={usdcAmount} symbol=" USDC"/>*/}
                    <MaxButton
                      onClick={() => {
                        onChangeAmountDSD(balanceUniDSD);
                      }}
                      title="Max"
                    />
                  </div>
                  <div style={{width: '40%', minWidth: '6em'}}>
                    {
                      (!isPos(amountDSD) || amountDSD.isGreaterThan(balanceUniDSD))
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
                          onClick={() => migrateUniV2(user, toBaseUnitBN(amountDSD, UNI.decimals), UNI_DSD_USDC.addr)}
                        />
                    }
                  </div>
                </div>
                : <Button
                  wide
                  icon={<IconCirclePlus/>}
                  label="Approve UNI-V2 DSD"
                  onClick={() => {
                    approvePairDSD(UNI_DSD_USDC.addr, ZAP_PIPE.addr);
                  }}
                  disabled={user === ''}
                />
            }
          </div>
          <Button
            wide
            icon={<IconCirclePlus/>}
            label="Approve UNI-V2 DSD"
            onClick={() => {
              approvePairDSD(UNI.addr, ZAP_PIPE.addr);
            }}
            disabled={user === ''}
          />
        </Container>
      </div>
      <div style={{width: '100%', paddingTop: '2%', textAlign: 'center'}}>
        <span style={{opacity: 0.5}}>Save some gas by Zapping USDC/SSD/ESD/DSD/ZAI and invest to UNI-V2 of SSD pair with 1-click.</span>
      </div>
    </Box>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  width: 100%;
  @media (max-width: 568px) {
    flex: none;
  }
`

export default Migrate;