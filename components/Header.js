import React from 'react';
import { Menu } from 'semantic-ui-react';

export default () =>{
  return(
    <Menu style = {{ marginTop:'15px'}}>
      <Menu.Item>
        Crowd Coin
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          +
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
