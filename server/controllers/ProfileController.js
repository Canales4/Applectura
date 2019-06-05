var service = require ('../Services/ProfileService');

class ProfileController {

  profDelete(req, res){
    const { codUsuario } = req.params;
    var p = service.borrarPerfil(codUsuario, res)
  };

  profMody(req,res){
    var p = service = service.modificarPerfil(res);
  };

  conFav(req,res){
    const { codLibro } = req.body;
    const { codUsuario } = req.body;
    var p = service.codigoFavorito(codLibro, codUsuario, res);
  };

  lastFav(req,res){
    const { codUsuario } = req.params;
    var p = service.ultimoFavorito(codUsuario, res)
  };

}

module.exports = ProfileController = new ProfileController();
