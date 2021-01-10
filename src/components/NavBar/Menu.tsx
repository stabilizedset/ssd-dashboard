import React from 'react';
import {LinkBase} from '@aragon/ui';

import './style.css'

type MenuProps = {
  history: any,
  page: string
}

// const CustomToggle = React.forwardRef(({ children, onClick }: any, ref: any)=> (
//   <span
//     ref={ref}
//     onClick={(e) => {
//       e.preventDefault();
//       onClick(e);
//     }}
//   >
//     {children}
//   </span>
// ));

const Menu = ({history, page}: MenuProps) => {
  return (
    <>
      <LinkButton title="DAO" onClick={() => history.push('/dao/')} isSelected={page.includes('/dao')}/>
      <LinkButton title="Liquidity" onClick={() => history.push('/pool/')} isSelected={page.includes('/pool')}/>
      <LinkButton title="Regulation" onClick={() => history.push('/regulation/')} isSelected={page.includes('/regulation')}/>
      <LinkButton title="Governance" onClick={() => history.push('/governance/')} isSelected={page.includes('/governance')}/>
      <LinkButton title="Coupons" onClick={() => history.push('/coupons/')} isSelected={page.includes('/coupons')}/>
      <LinkButton title="Tools" onClick={() => history.push('/tools/')} isSelected={page.includes('/tools')}/>
    </>
  );
};

type linkButtonProps = {
  title: string,
  onClick: Function,
  isSelected?: boolean
}

function LinkButton({title, onClick, isSelected = false}: linkButtonProps) {
  return (
    <LinkBase onClick={onClick} style={{marginLeft: '8px', marginRight: '8px', height: '40px'}}>
      <div style={{padding: '1%', opacity: isSelected ? 1 : 0.5, fontSize: 17}}>{title}</div>
    </LinkBase>
  );
}

export default Menu;