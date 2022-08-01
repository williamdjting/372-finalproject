var chai = require("chai");
// const assert = require('chai').assert;
var server = require('../server'); 
var chaiHttp = require("chai-http");
var should = chai.should();
var bcrypt = require("bcrypt");
var expect = chai.expect();

chai.use(chaiHttp);

// test for our user stories

// i.e.
// login page
// register page
// join a group
// create a group
// add stock to personal watchlist
// remove stock from personal watchlist
// add stock to group watchlist
// remove stock from group watchlist
// insights dashboard shows correct information 
// - when a watchlist change is made
//   - add
//   - remove
