// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CharitySupportPlatform {
    struct Charity {
        string name;
        address payable wallet;
        uint256 totalDonations;
    }
    
    mapping(uint256 => Charity) public charities;
    uint256 public charityCounter;
    
    event CharityRegistered(uint256 charityId, string name, address wallet);
    event DonationMade(uint256 charityId, address donor, uint256 amount);
    
    function registerCharity(string memory _name, address payable _wallet) public {
        charityCounter++;
        charities[charityCounter] = Charity(_name, _wallet, 0);
        emit CharityRegistered(charityCounter, _name, _wallet);
    }
    
    function donate(uint256 _charityId) public payable {
        require(charities[_charityId].wallet != address(0), "Charity does not exist");
        require(msg.value > 0, "Donation must be greater than zero");
        
        charities[_charityId].wallet.transfer(msg.value);
        charities[_charityId].totalDonations += msg.value;
        
        emit DonationMade(_charityId, msg.sender, msg.value);
    }
    
    function getTotalDonations(uint256 _charityId) public view returns (uint256) {
        return charities[_charityId].totalDonations;
    }
}
