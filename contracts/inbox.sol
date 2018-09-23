pragma solidity ^0.4.24;

contract Inbox {
  string public message;

  constructor(string initMessage) public {
    message = initMessage;
  }
  function setMessage(string newMessage) public {
    message = newMessage;
  }
}