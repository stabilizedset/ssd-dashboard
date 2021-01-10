import React from 'react';

import {
  ButtonBase,
} from '@aragon/ui';

type MaxButtonProps = {
  title: string
  onClick: Function
};

function MaxButton({ onClick, title }:MaxButtonProps) {
  return (
    <div style={{ padding: 3 }}>
      <ButtonBase onClick={onClick}>
        <span style={{ opacity: 0.5 }}> {title || 'Max'}  </span>
      </ButtonBase>
    </div>
  );
}

MaxButton.defaultProps = {
  title: ''
}

export default MaxButton;
