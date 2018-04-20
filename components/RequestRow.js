import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import CompaignCreate from '../ethereum/compaignCreate';

class RequestRow extends Component{
constructor(props){
    super(props);
    this.state={
      aprCount:props.request.approvalCount,
      loading: false
    };
  }

  onApprove = async () =>{
    try{
      this.setState({loading: true});
      const compaignObj =  CompaignCreate(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await compaignObj.methods.approveRequest(this.props.id).send({from: accounts[0]});
      this.setState({
        aprCount: requestResponse.approvalCount
        });
    }catch(error){
      console.log('error occurred!!');
    }
    this.setState({
      loading: false
      });
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
    console.log(this.state.hideApprove);
    return(
      <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.reciepint}</Cell>
        <Cell>{this.state.aprCount}/{approversCount}</Cell>
        <Cell>
        { (request.complete || this.state.hideApprove) ? null :(
            <Button loading={this.state.loading} color="green" basic onClick={this.onApprove}>Approve</Button>
        )}
        </Cell>

        <Cell>
        { request.complete ? null :(
           <Button color="teal" basic onClick={this.onFinalize}>Finalize</Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
