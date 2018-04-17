import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import {Button} from 'semantic-ui-react';
import {Link} from '../../../routes';

class RequestIndex extends Component{
  static async getInitialProps(props){
    return {address: props.query.address};
  }
  render(){
    return(
      <Layout>
        <h3>Request Index page!!</h3>
        <Link route={`/compaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add Requests</Button>
          </a>
        </Link>
      </Layout>

    );
  }
}

export default RequestIndex;
