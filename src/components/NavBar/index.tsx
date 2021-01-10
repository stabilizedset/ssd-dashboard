import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { LinkBase, useTheme } from '@aragon/ui';
import ConnectButton from './ConnectButton';

import Menu from "./Menu";
import './style.css'

type NavbarProps = {
  hasWeb3: boolean,
  user: string,
  setUser: Function
}

function NavBar({
  hasWeb3, user, setUser,
}:NavbarProps) {
  const history = useHistory();
  const currentTheme = useTheme();

  const [page, setPage] = useState(history.location.pathname);

  useEffect(() => {
    return history.listen((location) => {
      setPage(location.pathname)
    })
  }, [hasWeb3, user, history]);

  const logoUrl = `./logo/logo_${currentTheme._name === 'light' ? 'black' : 'white'}.png`

  return (
    <>
      <div style={{
        borderTop: '1px solid ' + currentTheme.border,
        backgroundColor: 'none',
        textAlign: 'center',
        width: '100%',
        fontSize: '14px',
        marginBottom: 20
      }}>
        <div style={{maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto'}}>
          <div className="container">
            <div className="logo">
              <LinkBase onClick={() => history.push('/')} style={{marginRight: '16px', height: '40px'}}>
                <img src={logoUrl} height="40px" alt="Stabilized Set Dollar"/>
              </LinkBase>
            </div>
            <div className="menu">
              <Menu history={history} page={page}/>
            </div>
            <div>
              <ConnectButton hasWeb3={hasWeb3} user={user} setUser={setUser} />
            </div>
          </div>
          <div className="menu-mobile">
            <Menu history={history} page={page}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
