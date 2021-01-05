import React from 'react';
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
type EpochBlockProps = {
  epoch: string
}

function EpochBlock({ epoch }: EpochBlockProps) {
	 const history = useHistory();
  return (
    <>
      <div style={{ fontSize: 16, padding: 3 }}>Epoch <Icon src="./images/chronometer.png"
      onClick={() => history.push('/epoch/')}/></div>
      <div style={{ fontSize: 24, padding: 3, fontWeight: 400, lineHeight: 1.5, fontFamily: 'aragon-ui-monospace, monospace'}}>{epoch}</div>
    </>
  );
}
const Icon = styled.img`
  border: 1px solid #ffffff;
  border-radius: 10px;
  background-color: #ffffff;
  width: 20px;
  cursor: pointer;
`
export default EpochBlock;
