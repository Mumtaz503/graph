// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Storage {

    struct UserData {
        string name;
        string job;
        uint256 experience;
    }

    UserData[] private s_userData;
    event Store(string name_, string _job, uint256 experience_);

    function store(string memory _name, string memory _job, uint256 _experience) public {
        UserData memory userData = UserData(_name, _job, _experience);
        s_userData.push(userData);
        emit Store(_name, _job, _experience);
    }

}
