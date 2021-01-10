import React from 'react';
import { LinkBase, useTheme } from '@aragon/ui';
import ChangeModeButton from "./SwitchTheme";
import styled from 'styled-components'

type FooterProps = {
  updateTheme: Function,
  theme: string,
  hasWeb3: boolean,
}

function Footer({updateTheme, theme, hasWeb3}: FooterProps) {
  const currentTheme = useTheme();

   return (
    <>
      <div style={{
        borderTop: '1px solid ' + currentTheme.border,
        backgroundColor: currentTheme.surface,
        textAlign: 'center',
        position: 'fixed',
        left: '0',
        bottom: '0',
        height: 'auto',
        width: '100%',
        fontSize: '14px'
      }}>
        <div style={{maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto'}}>
          <div style={{ padding: '2%', display: 'flex'}}>
            <div style={{ width: '50%', textAlign: 'left' }}>
              <FooterLink icon={<i className="fab fa-github"/>} href={"https://www.github.com/stabilizedset"}/>
              <FooterLink icon={<i className="fab fa-twitter"/>} href={"https://www.twitter.com/stabilizedset"}/>
              <FooterLink icon={<i className="fab fa-medium"/>} href={"https://www.medium.com/@stabilizedset"}/>
              <FooterLink icon={<i className="fab fa-telegram"/>} href={"https://t.me/stabilizedsetdollar"}/>
            </div>
            <div style={{ width: '45%', textAlign: 'right', height: '18px', marginTop: '15px', marginBottom: '15px'}}>
              made with <span role="img" aria-labelledby="heartbreak">❤️</span> by SSD Team based on the work of &#123;ess&#125; and TSD.
            </div>
            <div style={{ width: '5%', textAlign: 'right', marginTop: '4px' }}>
              <ChangeModeButton hasWeb3={hasWeb3} theme={theme} updateTheme={updateTheme} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;

  @media (max-width: 522px) {
    display: block;
  }
`

const ContainerTeam = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 522px) {
    justify-content: center;
  }
`

const Icon = styled.img`
  margin: 0 5px;
  border: 1px solid #ffffff;
  border-radius: 10px;
  background-color: #ffffff;
  width: 30px;
  cursor: pointer;
`

type FooterLinkProp = {
  icon: any,
  href: string,
}

function FooterLink({
  icon, href,
}:FooterLinkProp) {
  return (
    <LinkBase href={href} style={{marginLeft: '4px', marginRight: '4px'}}>
      <span style={{ fontSize: 32 }}>{icon}</span>
    </LinkBase>
  );
}

export default Footer;
