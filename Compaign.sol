pragma solidity ^0.4.18;

contract Compaign{
    struct Request{
        string description;
        uint value;
        address reciepint;
        bool complete;
    }
    
    address public manager;
    uint public minimumContribution;
    address[] public approvers;
    Request[] public requests;
    
    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }
  
    function Compaign(uint _minimumContribution) payable public{
      manager = msg.sender;
      minimumContribution = _minimumContribution;
    }

    function contribute() payable public {
        require(msg.value > minimumContribution);
        approvers.push(msg.sender);
    }
    
    function createRequest(string desc, uint value, address _reciepint) 
    onlyManager public {
        Request memory request = Request({
            description: desc, 
            value: value,
            reciepint: _reciepint,
            complete: false
        });
        
        requests.push(request);
    }
    
}
