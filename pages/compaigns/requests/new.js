import React, {Component} from 'react';
import {Form, Input, Button, Message} from 'semantic-ui-react';
import CompaignCreate from '../../../ethereum/compaignCreate';
import web3 from '../../../ethereum/web3';
import {Router, Link} from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends Component{
  state ={
    value:'',
    description:'',
    reciepint:'',
    loading:false,
    errorMessage:''
  }
  static async getInitialProps(props){
    const address = props.query.address;
    return {address};
  }

  onSubmit = async (event) =>{
    event.preventDefault();
    this.setState({loading: true, errorMessage:''});
    const {description, value, reciepint} = this.state;

    try{
      const accounts = await web3.eth.getAccounts();
      const compaignObj = CompaignCreate(this.props.address);
      await compaignObj.methods.createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        reciepint).send({from:accounts[0]});
        Router.pushRoute(`/compaigns/${this.props.address}/requests`);
    }catch(error){
    this.setState({
      errorMessage: error.message
    });
    }
    this.setState({loading: false});
  }
  render(){
    return(
      <Layout>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Link route={`/compaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
      <h3>Create a Request!</h3>
        <Form.Field>
          <label>Description</label>
          <Input
            value={this.state.description}
            onChange={event => this.setState({description: event.target.value})}>
          </Input>
        </Form.Field>

        <Form.Field>
          <label>Value in ether</label>
          <Input label="ether" labelPosition="right"
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}>
          </Input>
        </Form.Field>

        <Form.Field>
          <label>Reciepint</label>
          <Input
            value={this.state.reciepint}
            onChange={event => this.setState({reciepint: event.target.value})}>
          </Input>
        </Form.Field>

        <Form.Field>
          <Message error header="Oops" content={this.state.errorMessage}/>
          <Button loading={this.state.loading} primary>Create</Button>
        </Form.Field>
      </Form>
      </Layout>
    );
  }
}

export default RequestNew;
