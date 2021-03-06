pragma solidity ^0.4.18;

contract Compaign{
    struct Request{
        string description;
        uint value;
        address reciepint;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;

    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }

    modifier onlyApprover(){
        require(approvers[msg.sender] == true);
        _;
    }

    function Compaign(uint _minimumContribution, address creator) payable public{
      manager = creator;
      minimumContribution = _minimumContribution;
    }

    function contribute() payable public {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount += 1;
    }

    function createRequest(string _desc, uint _value, address _reciepint) onlyManager public {
        Request memory request = Request({
            description: _desc,
            value: _value,
            reciepint: _reciepint,
            complete: false,
            approvalCount: 0
        });
        requests.push(request);
    }

    function approveRequest(uint _requestNo) onlyApprover public{
        Request storage request = requests[_requestNo];
        require(request.approvals[msg.sender] == false);
        request.approvals[msg.sender] = true;
        request.approvalCount += 1;
    }

    function finalizeRequest(uint _requestNo) onlyManager public {
         Request storage request = requests[_requestNo];
         require(!request.complete);
         require(request.approvalCount > (approversCount / 2));

         request.complete = true;
         request.reciepint.transfer(request.value);
    }

    function getSummary() view public returns(uint, uint, uint, uint, address){
        return(
            this.balance,
            minimumContribution,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() view public returns(uint){
        return requests.length;
    }
}

contract CompaignFactory{
    address public owner;
    address[] public deployedCompaigns;

    function CompaignFactory() public{
        owner = msg.sender;
    }

    function createCompaign(uint minimumContribution) public{
       address deployedCompaign = new Compaign(minimumContribution, msg.sender);
       deployedCompaigns.push(deployedCompaign);
    }

    function getDeployedCompaign() public view returns(address[]){
        return deployedCompaigns;
    }
}
