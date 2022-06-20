// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract LpStg1 is ERC20 {

    constructor() ERC20("Lp Strategy 1","STG1") {}

    
    //TODO OVERRIDE TRANSFER FUNCTION TO REFLECT OWNERSHIP CHANGE IN THE STRATEGY HOLDINGS

    //TODO OVERRIDE TRANSFERFROM FUNCTION TO REFLECT OWNERSHIP CHANGE IN THE STRATEGY HOLDINGS


}  