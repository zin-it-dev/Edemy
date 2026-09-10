// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.34;

contract Course {
  uint public x;

  event Increment(uint by);

  function inc() public {
    x += 2; // 🐞 bug!
    emit Increment(1);
  }

  function incBy(uint by) public {
    require(by > 0, "incBy: increment should be positive");
    x += by;
    emit Increment(by);
  }
}
