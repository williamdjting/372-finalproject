var chai = require("chai");
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
var assert = chai.assert;

chai.use(chaiHttp);

// assertion style = should()
// test for our user stories

describe('testing functions in stockquery.js', function() {
  //tests associated with querying the api
  it('should retrieve the stock information of the requested ticker', function(done){
    chai.request(server)
      .get('/stockquery/companyStockOverview')
      .end(function(err,res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
  it('should fetch all stocks from AlphaVantage API', function(done){
    chai.request(server)
      .get('/stockquery/allStocksCodeAndName')
      .end(function(err,res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });

  it('should add user inputted stock ticker to database, i.e. increase number of stocks in DB by 1 on a successful POST request for /addUserStockTickerToDb', function(done){
    chai.request(server).get('/stockquery/getUserStockListFromDb')
      .send({'username': 'test@gmail.com'}, '_id stockList')
      .end(function(err,res){
      var stockNumber0 = res.body.length;
      console.log("res.body", res.body);
      console.log("stockNumber0", stockNumber0);
      chai.request(server)
        .post('/stockquery/addUserStockTickerToDb')
          .send({'_id': '100'})
          .end(function(err,res){
            chai.request(server).get('/stockquery/getUserStockListFromDb')
              .end(function(err,res) {
                var stockNumber1 = res.body.length;
                (stockNumber1 - stockNumber0).should.equal(1);
              })
              done();
          });

      });

  });

  it('should remove user inputted stock ticker to database, i.e. decrease number of stocks in DB by 1 on a successful POST request for /removeUserStockTickerFromDb', function(done){
    chai.request(server).get('/stockquery/getUserStockListFromDb')
      .end(function(err,res){
      var stockNumber0 = res.body.length;
      chai.request(server)
        .post('/stockquery/removeUserStockTickerFromDb')
          .send({'_id': '1'})
          .end(function(err,res){
            chai.request(server).get('/stockquery/getUserStockListFromDb')
              .end(function(err,res) {
                var stockNumber1 = res.body.length;
                (stockNumber0 - stockNumber1).should.equal(1);
              })
              done();
          });

      });

  });






  //end of describe
});






describe('testing functions in users.js', function() {
  //tests associated with querying the api
  it('register a new user', function(done){
    var newUser = {'username': "william123", 'email' : "william123@gmail.com", "password" : "williampw", "stockCodes" : []}
    chai.request(server)
      .post('/users/register').send(newUser)
      .end(function(err,res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });

  it('login an existing user', function(done){
    var existingUser = {'username': 'test@gmail.com', 'password' : 'test'}
    chai.request(server)
      .post('/users/login').send(existingUser)
      .end(function(err,res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.login.should.be.equal(true);
        done();
      });
  });



// end of describe
})


// describe('testing functions in groups.js', function() {
//   //tests associated with querying the api
//   it('')



// })