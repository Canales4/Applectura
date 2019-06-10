var service = require ('../Services/ProfileService');

class ProfileController {

  profDelete(req, res){
    const { codUsuario } = req.params;
    service.borrarPerfil(codUsuario, res)
  };

  profMody(req,res){
    service.modificarPerfil(res);
  };

  conFav(req,res){
    const { codLibro } = req.body;
    const { codUsuario } = req.body;
    service.codigoFavorito(codLibro, codUsuario, res);
  };

  lastFav(req,res){
    const { codUsuario } = req.params;
    service.ultimoFavorito(codUsuario, res)
  };

}

module.exports = ProfileController = new ProfileController();
