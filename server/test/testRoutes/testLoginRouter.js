let nock = require('nock');
var mockRequest = nock('http://localhost:3000');

describe('Test de rutas del Login', () =>{

  it('Test ruta /loginPage/register', function() {
    mockRequest
    .post('/loginPage/register')
  });

  it('Test ruta /loginPage/login', function() {
    mockRequest
    .post('/loginPage/login')
  });

  it('Test ruta /loginPage/profile', function() {
    mockRequest
    .get('/loginPage/profile')
  });
});
