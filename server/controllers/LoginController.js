var service = require ('../Services/LoginService');

class LoginController{


  register(req,res){
    var serv = service.regitrar(res);
  };

  login(req,res){
    var serv = service.inicio(res);
  };

  profile(req,res){
    var serv = service.perfil(res);
  };
}

module.exports = LoginController = new LoginController();
