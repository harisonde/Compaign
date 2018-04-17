import React, {Component} from 'react';
import {Button, Form, Input, Message} from 'semantic-ui-react';
import CompaignCreate from '../ethereum/compaignCreate';
import web3 from '../ethereum/web3';

class ContributeForm extends Component{
  state ={
    value:'',
    errorMessage:'',
    loading: false
  }

  onSubmit = async (event) => {
    event.preventDefault();
    thi.setState({loading: true, errorMessage:''});
    const compaignObj = CompaignCreate(this.props.address);
    try{
      const accounts = await web3.eth.getAccounts();
      compaignObj.methods.contribute().send({
          from:accounts[0],
          value:web3.utils.toWei(this.state.value, 'ether')
          });
      Router.replaceRoute(`/compaign/${this.props.address}`);
    }catch(error){
      this.setState({errorMessage:error.message});
    }
    this.setState({value: '', loading: false});
  }

  render(){
    return(
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
        <label>Amount to Contribute</label>
          <Input label="Ether"
            labelPosition="right"
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}
            />
          <br/>  <br/>
        <Message error header="Oops!!!" content={this.state.errorMessage} />
        <Button loading={this.state.loading} primary>Contribute</Button>
        </Form.Field>
      </Form>
    );
  }
}

export default ContributeForm;
