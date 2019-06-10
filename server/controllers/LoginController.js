var service = require ('../Services/LoginService');

class LoginController{


  register(req,res){
    service.regitrar(req, res);
  };

  login(req,res){
    service.inicio(req, res);
  };

  profile(req,res){
    service.perfil(req, res);
  };
}

module.exports = LoginController = new LoginController();
