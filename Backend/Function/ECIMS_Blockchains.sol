pragma solidity ^0.6.0;

//import 'Blockchain_Contract/'

contract Blockchain
{
	struct Cooperator
	{
		address Account_Address;
		uint Balance;
	}

	//WALA LANG TESTING LANG XD

	constructor() public
	{
		Cooperator.Account_Address = address(this);
		Cooperator.Balance = address(this).balance;
	}

	function transferamount (address payable recipient, uint amount) public payable
	{
		recipient.transfer(amount ether);
	}

	function get_Balance () public returns (uint256)
	{
		return msg.sender.balance;
	}
}