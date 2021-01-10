import React, {useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';

import {
  Button, IdentityBadge, Box, IconPower, LinkBase,
} from '@aragon/ui';

import {connect} from '../../utils/web3';
import TotalBalance from "./TotalBalance";
import ConnectModal from './ConnectModal';

import './style.css';

type connectButtonProps = {
  hasWeb3: boolean,
  user: string,
  setUser: Function
}

function ConnectButton({hasWeb3, user, setUser}: connectButtonProps) {
  const {account, status, reset, ethereum} = useWallet();

  const [isModalOpen, setModalOpen] = useState(false);

  const connectWeb3 = async (wallet) => {
    await connect(wallet.ethereum);
    setUser(wallet.account);
    setModalOpen(false)
  };

  const disconnectWeb3 = async () => {
    setUser('');
    reset();
  };

  useEffect(() => {
    if (account) {
      connectWeb3({
        ethereum,
        account
      });
    }
  }, [account]);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return status === 'connected' ? (
    <div style={{display: 'flex'}}>
      <div style={{flex: '1'}}/>
      <div>
        <div style={{width: '192px'}}>
          <div style={{display: 'flex'}}>
            <div>
              <LinkBase onClick={disconnectWeb3} style={{marginRight: '8px', height: '24px'}}>
                <IconPower/>
              </LinkBase>
            </div>
            <div style={{flex: '1', textAlign: 'right'}}>
              <IdentityBadge
                  entity={user}/>
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{flex: '1', textAlign: 'right'}}>
              <TotalBalance user={user}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <ConnectModal visible={isModalOpen} onClose={toggleModal} onConnect={connectWeb3}/>
      <Button icon={<div className="icon-container">
        <span className="icon-connect-container"/>
        <span className="icon-connect"/>
      </div>} label="Connect Wallet" onClick={toggleModal} disabled={!hasWeb3}/>
    </>
  );
}


export default ConnectButton;
