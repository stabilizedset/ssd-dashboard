import React from "react";
import {
  Box, LinkBase, Tag,
} from '@aragon/ui';

type MainButtonPropx = {
  title: string,
  description: string,
  icon: any,
  onClick?: Function,
  tag?:string
  href?:string
}

function MainButton({
                      title, description, icon, onClick, tag, href
                    }:MainButtonPropx) {
  return (
    <LinkBase onClick={onClick} style={{ width: '100%' }} href={href}>
        <div style={{ padding: 10, fontSize: 25, fontWeight: 'bold' }}>
          {title}
          {tag ? <Tag>{tag}</Tag> : <></>}
        </div>
        <span style={{ fontSize: 48 }}>
          {icon}
        </span>
        {/*<img alt="icon" style={{ padding: 10, height: 64 }} src={iconUrl} />*/}
        <div style={{ paddingTop: 5, opacity: 0.5 }}>
          {' '}
          {description}
          {' '}
        </div>
    </LinkBase>
  );
};

export default MainButton;
