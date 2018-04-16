import React, {Component} from 'react';
import {Button, Form, Input, Message} from 'semantic-ui-react';

class ContributeForm extends Component{
  render(){
    return(
      <Form>
        <Form.Field>
        <label>Amount to Contribute</label>
        <Input label="Ether" labelPosition="right"/>
        <Button primary>Contribute</Button>
        </Form.Field>
      </Form>
    );
  }
}

export default ContributeForm;
