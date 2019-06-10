let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
let nock = require('nock');
var mockRequest = nock('http://localhost:3000');
const url= 'http://localhost:3000';


describe('Test de rutas de libros',()=>{

  //Test sobre una url de busqueda de libros (GET)
  it('Test ruta /books/:codUser', (done) => {
    chai.request(url)
      .get('/books/13')
      .end( function(err,res){
        //console.log(res.body) //(solo si necesito ver la informacion)
        expect(res.body[0].titulo).to.have.string('Thor y Loki (Thor & Loki)');
        expect(res).to.have.status(200);
        done();
      });
  });

  //Test sobre una url de busqueda por isbn (GET)
  it('Test ruta /books/isbn/:isbn', (done) => {
    chai.request(url)
      .get('/books/isbn/9781781101315')
      .end( function(err,res){
        expect(res.body[0].ISBN).to.have.string('9781781101315');
        expect(res).to.have.status(200);
        done();
      });
  });

  //Test mockeado sobre una url de fav (POST)
  it('Test ruta /books/fav', function() {
    mockRequest
    .post('/books/fav', {
      'codUsuario': 9,
      'codLibro': 1
    })
  });

  //Test mockeado sobre una url de all (POST)
  it('Test ruta /books/all', function() {
    mockRequest
    .post('/books/all')
  });
});
