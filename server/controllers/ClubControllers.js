var db = require('../database/db');
var service = require('../Services/ClubService')

class ClubController {

    list(req, res) {
        const termino = `${req.params.termino}%`;
        var lista = service.listar(termino, res);
    };

    listClubUser(req, res) {
        const { idUser } = req.params;
        var lista = service.listarClubUsuario(idUser, res);
    };

    getOne(req, res) {
        const { idClub } = req.params;
        var lista = service.cogeUno(idClub,res);
    };

    create(req, res) {
        const {  presidente } = req.body;
        var lista = service.crea(presidente, req, res);
    };

    delete(req, res) {
        const { idClub } = req.params;
        service.borra(idClub, res);
    };

    deleteSocio(req, res) {
        const { idS } = req.params;
        service.borraSocio(idS, res);
    };

    update(req, res) {
        const { idClub } = req.params;
        const { desClub } = req.body;
        const { nomClub } = req.body;
        const { icono } = req.body;
        service.modificacion(idClub, desClub, nomClub, icono, res);
    };

    joinClub(req, res) {
        const { idUser } = req.body;
        const { idClub } = req.body;
        service.unirseClub(idUser, idClub, res);
    }

    leaveClub(req, res) {
        const { idUser } = req.params;
        const { idClub } = req.params;
        service.salirClub(idUser, idClub, res);
    }

    getSocios(req, res) {
        const { idUser } = req.params;
        const { idClub } = req.params;
        service.cogerSocios(idUser, idClub, res);
    }

    getMonthBook(req, res) {
        const { mes } = req.params;
        const { codClub } = req.params;
        service.cogerLibrodelMes(mes, codClub, res);
    }

    getMonthsBooks(req, res) {
        const { codClub } = req.params;
        const { month } = req.params;
        service.cogerLibrosDelMes(codClub, month, res);
    }

    monthBook(req, res) {
        const { idClub } = req.body;
        const { idLib } = req.body;
        const { month } = req.body;
        service.mesLibro(idClub, idLib, month, res);
    }

    listClubSocios(req, res) {
      service.listaClubSocios(res);
    };

    listSociosClubs(req, res) {
        const { idClub } = req.params;
        service.listaSociosClub(idClub, res);
    };

}

module.exports = ClubController = new ClubController();
