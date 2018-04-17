import React, {Component} from 'react';
import {Form, Input, Button, Message} from 'semantic-ui-react';
import CompaignCreate from '../../../ethereum/compaignCreate';
import web3 from '../../../ethereum/web3';
import {Routes, Link} from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends Component{
  state ={
    value:'',
    description:'',
    reciepint:'',
    loading:false
  }
  static async getInitialProps(props){
    const address = props.query.address;
    return {address};
  }

  onSubmit = async (event) =>{
    event.preventDefault();
    this.setState({this.state.loading: true});
    try{
      const address = await web3.eth.getAccounts();

    }catch(error){

    }
    this.setState({this.state.loading: false});
  }
  render(){
    return(
      <Layout>
      <Form onSubmit={this.onSubmit}>
      <h3>Create a Request!</h3>
        <Form.Field>
          <label>Description</label>
          <Input
            value={this.state.description}
            onChange={event => this.setState({this.state.description: event.target.value})}>
          </Input>
        </Form.Field>

        <Form.Field>
          <label>Value in ether</label>
          <Input label="ether"
            value={this.state.value}
            onChange={event => this.setState({this.state.value: event.target.value})}>
          </Input>
        </Form.Field>

        <Form.Field>
          <label>Reciepint</label>
          <Input
            value={this.state.reciepint}
            onChange={event => this.setState({this.state.reciepint: event.target.value})}>
          </Input>
        </Form.Field>

        <Form.Field>
          <Button loading={this.state.loading} primary>Create</Button>
        </Form.Field>
      </Form>
      </Layout>
    );
  }
}

export default RequestNew;
