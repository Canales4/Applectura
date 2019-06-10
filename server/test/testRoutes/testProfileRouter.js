//EN ESTOS TEST UTILIZO LA HERRAMIENTA NOCK, PARA MOCKEAR EL SERVIDOR
let nock = require('nock');
var mockRequest = nock('http://localhost:3000');

describe('Test de rutas de Profile: ',()=>{

  //Test mockeado de borrado de perfil por codigo de usuario (DELETE)
  it('Test de ruta /profile/delete/:codUsuario', function() {
    mockRequest
    .delete('/profile/delete', {
      'codUsuario': 9
    })
  });

  //Test mockeado de ultimo libro favorito por codUsuario (GET)
  it('Test de ruta /profile/lastFavorite/:codUsuario', function() {
    mockRequest
    .get('/profile/lastFavorite',{
      'codUsuario': 9
    })
  });

  //test mockeado de la consulta sobre favoritos por codUsuario (POST)
  it('Test de ruta /profile/consultaFavorito', function() {
    mockRequest
    .post('/profile/consultaFavorito')
  });

  //Test mockeado de la modificacion de perfil (PUT)
  it('Test de ruta /profile/modify/:codUsuario', function() {
    mockRequest
    .put('/profile/modify',{
      'codUsuario': 9
    })
  });

});
