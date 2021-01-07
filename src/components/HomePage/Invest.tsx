import React from 'react';
import BigNumber from "bignumber.js";
import {Box, Button} from '@aragon/ui';
import {useHistory} from 'react-router-dom';

type InvestProps = {
  totalSupply: BigNumber,
  totalBonded: BigNumber,
  SSDLPBonded: BigNumber,
};

const Invest = ({totalSupply, totalBonded, SSDLPBonded}: InvestProps) => {
  const history = useHistory();
  const SSDLpBonded = SSDLPBonded.toNumber() * 2;
  const dao = (((((totalSupply.toNumber() * 4) / 100) * 60) / 100 + totalBonded.toNumber()) / totalBonded.toNumber());
  const lpHourly = ((((totalSupply.toNumber() * 4) / 100) * 40) / 100 + SSDLpBonded) / SSDLpBonded;
  const lpDaily = (((((totalSupply.toNumber() * 4) / 100) * 40) / 100) * 24 + SSDLpBonded) / SSDLpBonded;
  const lpWeekly = (((((totalSupply.toNumber() * 4) / 100) * 40) / 100) * 168 + SSDLpBonded) / SSDLpBonded;

  return (
    <>
      <div style={{padding: '1%', paddingTop: '2%', paddingBottom: '0%', display: 'flex', flexWrap: 'wrap'}}>
        <div style={{flexBasis: '45%', marginRight: '4%', marginLeft: '2%'}}>
          <Box>
            <div>
              <div style={{fontSize: 16, padding: 3}}>DAO APR hourly
                <div style={{
                  fontSize: 24,
                  padding: 3,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  fontFamily: 'aragon-ui-monospace, monospace'
                }}>
                  {((dao - 1) * 100).toFixed(2)}%
                </div>
              </div>
              <div style={{fontSize: 16, padding: 3}}>DAO APR daily
                <div style={{
                  fontSize: 24,
                  padding: 3,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  fontFamily: 'aragon-ui-monospace, monospace'
                }}>
                  {((dao - 1) * 24 * 100).toFixed(2)}%
                </div>
              </div>
              <div style={{fontSize: 16, padding: 3}}>DAO APR weekly
                <div style={{
                  fontSize: 24,
                  padding: 3,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  fontFamily: 'aragon-ui-monospace, monospace'
                }}>
                  {((dao - 1) * 168 * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          </Box>
        </div>
        <div style={{flexBasis: '45%'}}>
          <div style={{flexBasis: '45%', marginLeft: '1%'}}>
            <Box>
              <div>
                <div style={{fontSize: 16, padding: 3}}>LP APR hourly
                  <div style={{
                    fontSize: 24,
                    padding: 3,
                    fontWeight: 400,
                    lineHeight: 1.5,
                    fontFamily: 'aragon-ui-monospace, monospace'
                  }}>
                    {((lpHourly - 1) * 100).toFixed(2)}%
                  </div>
                </div>
                <div style={{fontSize: 16, padding: 3}}>LP APR daily
                  <div style={{
                    fontSize: 24,
                    padding: 3,
                    fontWeight: 400,
                    lineHeight: 1.5,
                    fontFamily: 'aragon-ui-monospace, monospace'
                  }}>
                    {((lpDaily - 1) * 100).toFixed(2)}%
                  </div>
                </div>
                <div style={{fontSize: 16, padding: 3}}>LP APR weekly
                  <div style={{
                    fontSize: 24,
                    padding: 3,
                    fontWeight: 400,
                    lineHeight: 1.5,
                    fontFamily: 'aragon-ui-monospace, monospace'
                  }}>
                    {((lpWeekly - 1) * 100).toFixed(2)}%
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invest;