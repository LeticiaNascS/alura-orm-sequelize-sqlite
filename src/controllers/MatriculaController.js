const Controller = require('./Controller.js');
const MatriculaServices = require ('../services/MatriculaServices.js');

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor(){
    super (matriculaServices);
  }
  async pegaMatriculaPorEstudante(req, res) {
    const {estudante_id} = req.params;
    try {
      const listaMatriculasPorEstudante = await matriculaServices.pegaEcontaRegistros({
        estudante_id: Number(estudante_id), 
        status: 'matriculado'
      });
      return res.status(200).json(listaMatriculasPorEstudante);
    }catch(erro){
      res.status(500).json({erro: erro.message});
    }
  }

}


module.exports = MatriculaController;

