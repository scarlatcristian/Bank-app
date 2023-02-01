"use strict";

const userData = sessionStorage.getItem("userData").split(" ");

class User {
  constructor(firstName, lastName, email) {
    this.owner = `${firstName} ${lastName}`;
    this.email = email;
  }
  movements = [];
  interestRage = 1.2;
  pin = 1111;
  movementsDates = [];
  currency = "EUR";
  locale = "ro-RO";
}

const account1 = new User(userData[0], userData[1], userData[2]);
account1.prototype = Object.create(User.prototype);

console.log(account1);
