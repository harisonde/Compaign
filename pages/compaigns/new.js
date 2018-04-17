import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CompaignNew extends Component{

  constructor(props){
    super(props);
    this.state ={
      minimumContribution:'',
      errorMessage:'',
      loading: false
    };
  }

  updateMinimumContribution(event){
    this.setState({
      minimumContribution: event.target.value
    });
  }

 createCompaign = async (event) =>{
   event.preventDefault();
   this.setState({loading: true, errorMessage:''});
   try{
    const accounts = await web3.eth.getAccounts();;
    await factory.methods.createCompaign(this.state.minimumContribution)
        .send({
              from: accounts[0]
          });
    Router.pushRoute('/');
    }
    catch(error){
       this.setState({
         errorMessage: error.message,
         loading: false
       });
      }
  this.setState({loading: false});
  };

  render(){
    return(
      <Layout>
      <Form onSubmit={this.createCompaign} error={!!this.state.errorMessage}>
        <Form.Field>
          <label> Minimum Contribution</label>
            <Input
              label="wei"
              value={this.state.minimumContribution}
              onChange={event => {this.updateMinimumContribution(event)}}
              labelPosition="right"
              />
        </Form.Field>
      <Message error header="Oops!!!" content={this.state.errorMessage} />
      <Button loading={this.state.loading} primary>Create</Button>
      </Form>
      </Layout>
    );
  }
}

export default CompaignNew;
