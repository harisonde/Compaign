import React, {Component} form 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import CompaignCreate from '../ethereum/compaignCreate';

class RequestRow extends Component{

  onApprove = async () =>{
    const compaignObj =  CompaignCreate(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await compaignObj.methods.approveRequest(this.props.id).send({from: accounts[0]});
  }

  onFinalize = async () =>{
    const compaignObj =  CompaignCreate(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await compaignObj.methods.finalizeRequest(this.props.id).send({from: accounts[0]});
  }

  render() {
    const {Cell, Row} = Table;
    const {id, request, approversCount} = this.props;

    const readyToFinalize = request.approvalCount > approversCount / 2;
    return(){
      <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.reciepint}</Cell>
        <Cell>{request.approvalCount}/{approversCount}</Cell>
        <Cell>
        { request.complete ? null :(
            <Button color="green" basic onClick={this.onApprove}>Approve</Button>
        )}
        </Cell>

        <Cell>
        { request.complete ? null :(
           <Button color="teal" basic onClick={this.onFinalize}>Finalize</Button>
          )}
        </Cell>
      </Row>
    }
  }
}

extends default RequestRow;
