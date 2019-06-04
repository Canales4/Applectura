var expect = require ("chai").expect;
var chai = require('chai');
var server = require('../app');
var books = require("../controllers/BooksControllers");

describe("Tests about bookscontroller", function() {
  it("Its, an object.. ?", function(){
      expect(books).to.be.a('object');
  });
  it("All property checked.. ?",function(){
    expect(books).has.a.property('booksUser').which.is.a('function');
    expect(books).has.a.property('booksIsbn').which.is.a('function');
    expect(books).has.a.property('booksStatus').which.is.a('function');
    expect(books).has.a.property('booksFav').which.is.a('function');
    expect(books).has.a.property('books').which.is.a('function');
  });
});

//Route Testing
/*describe('/get home',() => {
  it('it should get home', (done) => {

  });
});
describe('/GET book', () => {
    it('it should GET all the books', (done) => {
          chai.request(server)
          .get('/book')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
            done();
          });
    });
});*/
