// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Ownable {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _transferOwnership(msg.sender);
    }

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function _checkOwner() internal view {
        require(owner() == msg.sender, "Caller is not the owner");
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

contract FundMe is Ownable {
    uint256 public totalFunds;
    Payment[] public payments;

    event PaymentReceived(address indexed user, string name, uint256 amount);

    struct Payment {
        address user;
        string name;
        uint256 amount;
    }

    constructor() Ownable() {}

    function fund(string memory name) public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        totalFunds += msg.value;
        payments.push(Payment(msg.sender, name , msg.value));
        emit PaymentReceived(msg.sender, name , msg.value);
    }

    function withdrawFunds() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function getPaymentsByUser(address userAddress) public view returns (Payment[] memory) {
        uint256 count = 0;

        for (uint i = 0; i < payments.length; i++) {
            if (payments[i].user == userAddress) {
                count++;
            }
        }

        Payment[] memory userPayments = new Payment[](count);

        uint256 index = 0;
        for (uint i = 0; i < payments.length; i++) {
            if (payments[i].user == userAddress) {
                userPayments[index] = payments[i];
                index++;
            }
        }

        return userPayments;
    }

    function getAllPayments() public view returns (Payment[] memory) {
        return payments;
    }
}
