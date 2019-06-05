var service = require('../Services/HomeService')

class HomeControllers {

  root(req, res){
    var h =  service.raiz(res);
  };

  home(req, res){
    var h =  service.casa(res);
  };

  bestBook(req,res){
    var h =  service.mejorLibro(res);
  };

  iconHome(req,res){
    const { codUsuario } = req.params;
    var h =  service.iconoCasa(codUsuario, res);
  };

  newClub(req,res){
    var h =  service.nuevoClub(res);
  };

  lastBookAdd(req,res){
    var h =  service.ultimoLibroAniadido(res);
  };

  mostRead(req,res){
    var h =  service.masLeido(res);
  };

  searchUser(req,res){
    const termino = `${req.params.termino}%`;
    var h =  service.buscaUsuario(termino, res);
  };

  favoritos(req,res){
      const { codLibro } = req.body;
      const { codUsuario } = req.body;
      var h =  service.fav(codLibro, codUsario, res);
  };

  deleteFavorito(req,res){
    const { codLibro } = req.body;
    const { codUsuario } = req.body;
    var h =  service.borraFav(codLibro, codUsuario, res);
  };

  consultaFavorito(req,res){
    const { codLibro } = req.body;
    const { codUsuario } = req.body;
    var h =  service.consultaFav(codLibro, codUsuario, res);
  };

  lastFavoriteISBN(req,res){
    const { cod } = req.params;
    var h =  service.ultimoFavIsbn(cod, res);
  };
}

module.exports = HomeControllers = new HomeControllers();
