let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let sinon = require('sinon');
chai.use(chaiHttp);
const url= 'http://localhost:3000';
let nock = require('nock');
var mockRequest = nock('http://localhost:3000');

describe('Test de rutas del Home', () =>{

  it('Test ruta /bestbook', (done) =>{
    chai.request(url)
    .get('/bestbook')
    .end( function(err,res){
      expect(res.body[0].codTitulo).to.equal(23);
      expect(res).to.have.status(200);
      done();
    });
  });

  it('Test ruta /iconHome/:codUsuario', (done) =>{
    chai.request(url)
    .get('/iconHome/17')
    .end( function(err,res){
      expect(res.body[0].icono).to.equal("https://avatars0.githubusercontent.com/u/43571201?s=460&v=4");
      expect(res).to.have.status(200);
      done();
    });
  });

  it('Test ruta /newClub', (done) =>{
    chai.request(url)
    .get('/newClub')
    .end( function(err, res){
      expect(res.body[0].NombreClub).to.have.string('Hogwarts');
      expect(res).to.have.status(200);
      done();
    });
  });

  it('Test ruta /lastBookAdd', (done) =>{
    chai.request(url)
    .get('/lastBookAdd')
    .end( function(err,res){
      expect(res.body[0].codTitulo).to.equal(46);
      expect(res).to.have.status(200);
      done();
    });
  });

  it('Test ruta /mostRead', (done) =>{
    chai.request(url)
    .get('/mostRead')
    .end( function(err,res){
      expect(res.body[0].titulo).to.equal('Thor');
      expect(res).to.have.status(200);
      done();
    });
  });

  it('Test ruta /searchUser/:termino', (done) =>{
    chai.request(url)
    .get('/searchUser/M')
    .end( function(err,res){
      expect(res.body[0].nombre).to.have.string('Merche');
      expect(res).to.have.status(200);
      done();
    });
  });

  it('Test ruta /favoritos', function() {
    mockRequest
    .post('/favoritos')
  });

  it('Test ruta /deleteFavorito', function() {
    mockRequest
    .post('/deleteFavorito')
  });

  it('Test ruta /consultaFavorito', function() {
    mockRequest
    .post('/consultaFavorito')
  });

  it('Test ruta /lastFavoriteISBN/:cod', (done) =>{
    chai.request(url)
    .get('/lastFavoriteISBN/16')
    .end( function(err,res){
      expect(res.body[0].codFavoritos).to.equal(26);
      expect(res).to.have.status(200);
      done();
    });
  });

});
