import React, { Component } from 'react';
import { Card, Button} from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';

class CompaignIndex extends Component{
  static async getInitialProps(){
    const compaigns = await factory.methods.getDeployedCompaign().call();
    return {compaigns};
  }

  buildCompaigns(){
    const items = this.props.compaigns.map(address =>{
      return {
        header: address,
        description: <a>View Compaign</a>,
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }

  render(){
    return(
      <Layout>
        <div>
          <h3>Open Compaigns</h3>
          <Button floated="right" content="Create Compaign"  icon="add" primary={true}  />
          {this.buildCompaigns()}
        </div>
      </Layout>
    );
  }
}

export default CompaignIndex;
