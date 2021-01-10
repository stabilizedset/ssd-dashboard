import React from 'react';
import { useHistory } from 'react-router-dom';

type EpochBlockProps = {
  epoch: string
}

function EpochBlock({epoch}: EpochBlockProps) {
  const history = useHistory();
  return (
    <>
      <div style={{fontSize: 16, padding: 3}}>Epoch</div>
      <div style={{
        fontSize: 24,
        padding: 3,
        fontWeight: 400,
        lineHeight: 1.5,
        fontFamily: 'aragon-ui-monospace, monospace'
      }}>{epoch}</div>
      <div
        style={{fontSize: 16, padding: 3, cursor: 'pointer'}}
        onClick={() => history.push('/epoch/')}
      >Advance -&gt;</div>
    </>
  );
}

export default EpochBlock;
