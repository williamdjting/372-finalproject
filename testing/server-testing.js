var chai = require("chai");
// const assert = require('chai').assert;
var server = require('../server');

// before ( done =>
// {
//   server.on("app_started", function()
//   {
//     done()
//   })
// })

var chaiHttp = require("chai-http");
var should = chai.should();
var bcrypt = require("bcrypt");
var expect = chai.expect;
var assert = require("chai").assert;

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
describe('testing functions in stockquery.js', function() {
  //tests associated with querying the api
  it('should retrieve the stock information of the requested ticker', function(done){
    chai.request(server)
      .get('/companyStockOverview')
      .end(function(err,res){
        res.should.have.status(200);
        res.should.be.json;
        done();
    })


  });

  describe('should GET /',  () => {
    it('should get 200 status', (done) =>{
        chai.request(server)
        .get('/')
        .end( (err, res) => {
            res.should.have.status(200);
            done();
        });
    });

  })

});


// describe('testing functions in users.js', function() {
//   //tests associated with querying the api
//   it('')



// })


// describe('testing functions in groups.js', function() {
//   //tests associated with querying the api
//   it('')



// })