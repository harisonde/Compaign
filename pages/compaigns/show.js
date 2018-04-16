import React, { Component } from 'react';
import compaignCreateFunction from '../../ethereum/compaignCreate';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/contributeForm';
import web3 from '../../ethereum/web3';
import { Card } from 'semantic-ui-react';

class CompaignShow extends Component{
  static async getInitialProps(props){
    const accounts = await web3.eth.getAccounts();
    const compaignObj = await compaignCreateFunction(props.query.address);
    const summaryObj = await compaignObj.methods.getSummary().call();
    return {
      balance: summaryObj[0],
      minimumContribution: summaryObj[1],
      requests: summaryObj[2],
      approversCount: summaryObj[3],
      manager: summaryObj[4]
    };
  }

  renderCompaign(){
    const {balance,  minimumContribution,
      requests, approversCount, manager} = this.props;
    const items = [
      {
        header: manager,
        meta: 'Manager',
        description: 'Mananger is the one who created this compaign',
        style: {overflowWrap: 'break-word'}
      },

      {
        header: minimumContribution,
        meta: 'Minimum Contribution',
        description: 'Minimum contribution to contribute to this compaign',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: approversCount,
        description: 'Number of people donated to this compaign so far',
        meta : 'Approvers Count'
      },
      {
        header: requests,
        description: 'Request gets created to withdrwa money from compaign.These Requests need to be approved by contributer on this compaign',
        meta: 'Requests'
      },

      {
        header: web3.utils.fromWei(balance,'ether'),
        description: 'Balance is how much money left to spent on this compaign',
        meta: 'Balance in Ether'
      }
    ];
    return <Card.Group items={items}/>;
  }
  render(){
    return (
      <Layout>
        <h3>Compaign Details</h3>
        <br/>
          {this.renderCompaign()}
          <ContributeForm/>
      </Layout>
    );
  }
}

export default CompaignShow;
