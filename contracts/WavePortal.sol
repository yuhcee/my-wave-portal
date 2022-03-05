// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    // A little magic, google what events are in Solidity.
    event NewWave(address indexed from, uint256 timestamp, string message );

    /* 
    Created a struct named Wave.
    A Struct is basically a custom datatype where we can customise what we want to hold inside it. */
    struct Wave {
        address waver; // Address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    /* I declare a variable waves that lets me store array of structs.*/
    Wave[] waves;

    constructor() {
        console.log("Yo, yo, I am a contract and I am smart!");
    }

  /*
     * You'll notice I changed the wave function a little here as well and
     * now it requires a string called _message. This is the message our user
     * sends us from the frontend!
     */
    function wave (string memory _message) public {
        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);
    }

    function getTotalWaves() public view returns(uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}