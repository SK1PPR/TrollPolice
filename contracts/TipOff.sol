// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./TipToken.sol";
import "./EIP712MetaTransaction.sol";

contract TipOff is EIP712MetaTransaction("TipOff", "1") {
    event transferred(address sender, address receiver, uint amount);
    address payable admin;
    address approving_police;
    mapping(uint => TipToken) public tokencontractinstances;
    uint public contractsregistered = 0;

    /*
        0 - pending
        1 - approved
        2 - rejected
    */
    struct Tipof {
        string tipid;// stored fileId on hedera
        uint tipstatus;
        address payable tipsender;
    }

    mapping(string => Tipof) public history;

    mapping(address => uint) public userTipCount;
    mapping(address => uint) public policeTipCount;

    mapping(address => string[]) public userTipIds;
    mapping(address => string[]) public policeTipIds;

    mapping(address => mapping(string => Tipof)) public userToTips;
    mapping(address => mapping(string => Tipof)) public policeToTips;

    constructor() {
        admin = payable(msg.sender);
        approving_police = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    }

    function registerNewContract(TipToken tokenContract) public payable {
        tokencontractinstances[contractsregistered] = tokenContract;
        contractsregistered += 1;
    }

    // can be written on frontend using token service
    function onboard(uint instance, address caller) public payable {
        tokencontractinstances[instance].transfer_From(admin, caller, 10);
        emit transferred(admin, caller, 10);
    }

    function tipoff(
        uint instance,
        string memory tipid,
        uint tipamt,
        address payable tipper,
        address police
    ) public payable {
        Tipof memory tipdata = Tipof(tipid, 0, tipper);
        history[tipid] = tipdata;
        address contractadd = address(this);
        tokencontractinstances[instance].transfer_From(
            tipper,
            contractadd,
            tipamt
        );
        userTipCount[tipper] += 1;
        policeTipCount[police] += 1;

        userTipIds[tipper].push(tipid);
        policeTipIds[police].push(tipid);

        userToTips[tipper][tipid] = tipdata;
        policeToTips[police][tipid] = tipdata;

        emit transferred(tipper, contractadd, tipamt);
    }

    function rejectTip(
        uint instance,
        string memory tipid,
        uint tipamt
    ) public payable {
        require(msg.sender == approving_police, "not a police");
        address contractadd = address(this);
        tokencontractinstances[instance].transfer_From(
            contractadd,
            admin,
            tipamt
        );

        address tipper = history[tipid].tipsender;

        userToTips[tipper][tipid].tipstatus = 2;
        policeToTips[approving_police][tipid].tipstatus = 2;
        history[tipid].tipstatus = 2;

        emit transferred(contractadd, admin, tipamt);
    }

    function approveTip(
        uint instance,
        string memory tipid,
        uint tipamt
    ) public payable {
        require(msg.sender == approving_police, "not a police");
        Tipof memory tipdata = history[tipid];
        address contractadd = address(this);

        tokencontractinstances[instance].transfer_From(
            contractadd,
            tipdata.tipsender,
            tipamt + 1
        );

        userToTips[tipdata.tipsender][tipid].tipstatus = 1;
        policeToTips[approving_police][tipid].tipstatus = 1;
        history[tipid].tipstatus = 1;

        emit transferred(contractadd, tipdata.tipsender, tipamt + 1);
    }
}
