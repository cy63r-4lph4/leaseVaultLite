// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Token.sol";

contract ProfileSystem {
    struct Profile {
        address user;
        uint256 reputation;
        uint8 role;
        bool exists;
        string metadataCID;
    }

    mapping(address => Profile) private profiles;

    Alph4Core public coreToken;
    address public leaseVault;
    uint256 public airdropAmount;
    address public owner;

    event ProfileCreated(address indexed user, uint8 role, string metadataCID);
    event ProfileUpdated(address indexed user, uint8 role, string metadataCID);
    event ReputationUpdated(address indexed user, uint256 newScore);
    modifier onlyLeaseVault() {
        require(
            msg.sender == leaseVault,
            "Only LeaseVault can update reputation"
        );
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor(address tokenAddress, uint256 _airdropAmount) {
        coreToken = Alph4Core(tokenAddress);
        airdropAmount = _airdropAmount * (10 ** coreToken.decimals());
        owner = msg.sender;
    }

    function createProfile(
        address _user,
        uint8 _role,
        string calldata _metadataCID
    ) external {
        require(!profiles[_user].exists, "Profile already exists");

        profiles[_user] = Profile({
            user: _user,
            role: _role,
            metadataCID: _metadataCID,
            reputation: 0,
            exists: true
        });

        emit ProfileCreated(_user, _role, _metadataCID);

        if (airdropAmount > 0) {
            require(
                coreToken.balanceOf(address(this)) >= airdropAmount,
                "Not enough tokens in ProfileSystem"
            );
            coreToken.transfer(_user, airdropAmount);
        }
    }

    function updateProfile(uint8 _role, string calldata _metadataCID) external {
        require(profiles[msg.sender].exists, "Profile does not exist");

        Profile storage p = profiles[msg.sender];
        p.role = _role;
        p.metadataCID = _metadataCID;

        emit ProfileUpdated(msg.sender, _role, _metadataCID);
    }

    function getProfile(address user) external view returns (Profile memory) {
        require(profiles[user].exists, "Profile not found");
        return profiles[user];
    }

    function profileExists(address user) external view returns (bool) {
        return profiles[user].exists;
    }

    function setLeaseVault(address _leaseVault) external onlyOwner {
        require(leaseVault == address(0), "LeaseVault already set");
        leaseVault = _leaseVault;
    }

    function adjustReputation(
        address user,
        int256 delta
    ) external onlyLeaseVault {
        require(profiles[user].exists, "Profile not found");
        int256 newRep = int256(profiles[user].reputation) + delta;
        if (newRep < 0) newRep = 0;
        profiles[user].reputation = uint256(newRep);
        emit ReputationUpdated(user, profiles[user].reputation);
    }
}
