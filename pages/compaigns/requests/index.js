import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import {Button, Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import CompaignCreate from '../../../ethereum/compaignCreate';
import RequestRow from '../../.../components/RequestRow';

class RequestIndex extends Component{
  static async getInitialProps(props){
    const compaignObj = CompaignCreate(props.query.address);
    const count = await compaignObj.methods.getRequestCount().call();
    const approversCount = await compaignObj.methods.approverCount().call();

    const requests = await Promise.all(
      Array(parseInt(count))
      .fill
      .map((element, index) =>{
        return compaignObj.methods.requests(index).call();
      })
    );

    return {address: props.query.address,
      requests: requests,
       requestCount: count,  approversCount: approversCount};
  }

renderRows(){
  return this.props.requests.map((request, index) =>{
        return <RequestRow
                request={request}
                id={index}
                key={index}
                address= {this.props.address}
                approversCount = {this.props.approversCount}
                />
  });
    }
  render(){
    const {Header, Row, HeaderCell, Body} = Table;

    return(
      <Layout>
        <h3>Request Index page!!</h3>
        <Link route={`/compaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{marginBottom: 10 }}>Add Requests</Button>
          </a>
        </Link>

        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Reciepint</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>

          <Body>
            {this.renderRows()}
          </Body>

        </Table>
        <div>Found {this.props.requestCount} requests.</div>
      </Layout>

    );
  }
}

export default RequestIndex;
