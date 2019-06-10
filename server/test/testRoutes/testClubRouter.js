let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let sinon = require('sinon');
chai.use(chaiHttp);
let nock = require('nock');
var mockRequest = nock('http://localhost:3000');
const url= 'http://localhost:3000';

describe('Test de rutas de clubs', () =>{

  //Test sobre una url de clubs (GET)
  it('Test ruta /club/clubs/:termino', (done) =>{
    chai.request(url)
    .get('/club/clubs/H')
    .end( function(err,res){
      expect(res.body[0].nomClub).to.have.string('Hogwarts');
      expect(res).to.have.status(200);
      done();
    });
  });
  //Test sobre la url de club lista usuarios (GET)
  it('Test ruta /club/list/:idUser', (done) =>{
    chai.request(url)
    .get('/club/list/13')
    .end( function(err, res){
      expect(res.body[0].codClub).to.equal(30);
      expect(res).to.have.status(200);
      done();
    });
  });

  //Test sobre la url de club lista club (GET)
  it('Test ruta /club/listaC/:idClub', (done) =>{
    chai.request(url)
    .get('/club/listaC/30')
    .end(function(err, res){
      expect(res.body[0].nombre).to.equal("Merche");
      expect(res).to.have.status(200);
      done();
    });
  });

  //Test sobre la url de club lista socios (GET)
  it('Test ruta /club/listS/socios', (done) =>{
    chai.request(url)
    .get('/club/listS/socios')
    .end(function(err, res){
      expect(res.body[0].cuenta).to.equal(3);
      expect(res).to.have.status(200);
      done();
    });
  });

  //Test sobre la url de club lista un club (GET)
  it('Test ruta /club/:idClub', (done) =>{
    chai.request(url)
    .get('/club/30')
    .end(function(err, res){
      expect(res.body[0].presidente).to.equal(10);
      expect(res).to.have.status(200);
      done();
    });
  });

  //Test sobre la url de club borra un club  (DELETE)
  it('Test ruta /club/:idClub (delete)', (done) =>{
    chai.request(url)
    .del('/club/31')                    //borra en la base de datos de verdad
    .end( function(err,res){
      expect(res).to.have.status(200);
      done();
    });
  });

  //Test sobre la url de club modifica un club  (PUT)
  it('Test ruta /club/:idClub (update)', (done) =>{
    chai.request(url)
    .put('/club/21')
    .end( function(err,res){
      expect(res).to.have.status(200);
      done();
    });
  });

  //Test mockeado sobre la url de unirse a un club (POST)
  it('Test ruta /club/join', function() {
    mockRequest
    .post('/club/join', {
      'idUser': 21,
      'idClub': 30
    })
  });

  //Test mockeado borrado usuarios del club (DELETE)
  it('Test ruta /club/leave/:idUser/:idClub', function() {
    mockRequest
    .delete('/club/leave', {
      'idUser': 21,
      'idClub': 30
    });
  });

  //Test lista el cod del socio de un club
  it('Test ruta /club/socios/:idUser/:idClub', (done) =>{
    chai.request(url)
    .get('/club/socios/10/30')
    .end( function(err,res){
      expect(res.body[0].codSocio).to.equal(51);
      expect(res).to.have.status(200);
      done();
    });
  });

  //Test añade libro del mes
  it('Test ruta /club/monthBook', function(){
    mockRequest
    .post('/club/monthBook')
  });

  //Test lista los libros del mes
  it('Test ruta /club/monthBooks/:codClub/:month', (done) =>{
    chai.request(url)
    .get('/club/monthBooks/30/1')
    .end(function(err, res){
      expect(res.body[0].titulo).to.equal('Harry Potter y Las Reliquias de la Muerte');
      expect(res).to.have.status(200);
      done();
    });
  });

  //Test elimina los socios
  it('Test ruta /club/expel/:idS', function() {
    mockRequest
    .delete('/club/expel/:idS', {
      'codSocio': 10
    })
  });

});
