// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Token.sol";
import "./Profile.sol";

contract LeaseVault {
    Alph4Core public coreToken;
    ProfileSystem public profileSystem;
    address public owner;

    uint256 public propertyCounter;
    uint256 public leaseCounter;

    struct Property {
        uint256 id;
        address landlord;
        uint256 rentAmount;
        uint256 securityDeposit;
        string metadataCID;
        bool exists;
    }

    struct Lease {
        uint256 id;
        uint256 propertyId;
        address tenant;
        uint256 startDate;
        uint256 endDate;
        uint256 depositHeld;
        bool approved;
        bool active;
    }

    mapping(uint256 => Property) public properties;
    mapping(uint256 => Lease) public leases;
    mapping(uint256 => uint256[]) public propertyLeases;
    mapping(address => uint256) public pendingWithdrawals;

    event PropertyListed(uint256 propertyId, address landlord);
    event LeaseRequested(
        uint256 leaseId,
        uint256 propertyId,
        address tenant,
        uint256 startDate,
        uint256 endDate
    );
    event LeaseApproved(uint256 leaseId, uint256 propertyId, address landlord);
    event RentPaid(uint256 leaseId, address tenant, uint256 amount);
    event LeaseEnded(uint256 leaseId);
    event Withdrawn(address landlord, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _token, address _profileSystem) {
        coreToken = Alph4Core(_token);
        profileSystem = ProfileSystem(_profileSystem);
        owner = msg.sender;
    }

    function listProperty(
        address landlord,
        uint256 rentAmount,
        uint256 deposit,
        string calldata metadataCID
    ) external {
        propertyCounter++;
        properties[propertyCounter] = Property({
            id: propertyCounter,
            landlord: landlord,
            rentAmount: rentAmount,
            securityDeposit: deposit,
            metadataCID: metadataCID,
            exists: true
        });

        emit PropertyListed(propertyCounter, landlord);

        _bumpReputation(landlord, 5);
    }

    function requestLease(
        address tenant,
        uint256 propertyId,
        uint256 startDate,
        uint256 endDate
    ) external {
        require(properties[propertyId].exists, "Property not found");
        require(endDate > startDate, "Invalid dates");

        leaseCounter++;
        leases[leaseCounter] = Lease({
            id: leaseCounter,
            propertyId: propertyId,
            tenant: tenant,
            startDate: startDate,
            endDate: endDate,
            depositHeld: 0,
            approved: false,
            active: false
        });

        propertyLeases[propertyId].push(leaseCounter);

        emit LeaseRequested(
            leaseCounter,
            propertyId,
            tenant,
            startDate,
            endDate
        );
    }

    function approveLease(address _sender, uint256 leaseId) external {
        Lease storage L = leases[leaseId];
        Property storage P = properties[L.propertyId];

        require(_sender == P.landlord, "Only landlord can approve");
        require(!L.approved, "Already approved");

        uint256 total = P.rentAmount + P.securityDeposit;
        require(
            coreToken.transferFrom(L.tenant, address(this), total),
            "Payment failed"
        );

        pendingWithdrawals[P.landlord] += P.rentAmount;
        L.depositHeld = P.securityDeposit;
        L.approved = true;
        L.active = true;

        emit LeaseApproved(leaseId, L.propertyId, P.landlord);

        _bumpReputation(L.tenant, 10);
        _bumpReputation(P.landlord, 5);
    }

    function payRent(uint256 leaseId, address tenant) external {
        Lease storage L = leases[leaseId];
        Property storage P = properties[L.propertyId];

        require(L.active && L.approved, "Lease inactive");
        require(L.tenant == tenant, "Not tenant");

        require(
            coreToken.transferFrom(tenant, address(this), P.rentAmount),
            "Rent transfer failed"
        );
        pendingWithdrawals[P.landlord] += P.rentAmount;

        emit RentPaid(leaseId, tenant, P.rentAmount);

        _bumpReputation(tenant, 2);
    }

    function endLease(uint256 leaseId, address _sender) external {
        Lease storage L = leases[leaseId];
        Property storage P = properties[L.propertyId];

        require(L.active, "Lease inactive");
        require(_sender == P.landlord || _sender == L.tenant, "Not authorized");

        if (L.depositHeld > 0) {
            require(
                coreToken.transfer(L.tenant, L.depositHeld),
                "Refund failed"
            );
            L.depositHeld = 0;
        }

        L.active = false;

        emit LeaseEnded(leaseId);

        _bumpReputation(L.tenant, 3);
        _bumpReputation(P.landlord, 3);
    }

    function withdraw(address _sender) external {
        uint256 amount = pendingWithdrawals[_sender];
        require(amount > 0, "Nothing to withdraw");

        pendingWithdrawals[_sender] = 0;
        require(coreToken.transfer(_sender, amount), "Withdraw failed");

        emit Withdrawn(_sender, amount);
    }

    function _bumpReputation(address user, int256 bump) internal {
        if (profileSystem.profileExists(user)) {
            profileSystem.adjustReputation(user, bump);
        }
    }
}
