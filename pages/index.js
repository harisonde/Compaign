import React, { Component } from 'react';
import factory from '../ethereum/factory';

class CompaignIndex extends Component{
  static async getInitialProps(){
    const compaigns = await factory.methods.getDeployedCompaign().call();
    return {compaigns};
  }

  render(){
    return(
      <h2>{this.props.compaigns[0]}</h2>
    );
  }
}

export default CompaignIndex;
