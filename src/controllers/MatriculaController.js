const Controller = require('./Controller.js');
const MatriculaServices = require ('../services/MatriculaServices.js');
const Sequelize = require ('sequelize');
const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor(){
    super (matriculaServices);
  }
  async pegaMatriculaPorEstudante(req, res) {
    const {estudante_id} = req.params;
    try {
      const listaMatriculasPorEstudante = await matriculaServices.pegaEcontaRegistros({
        where: {
          estudante_id: Number(estudante_id), 
          status: 'matriculado'
        },

      });
      return res.status(200).json(listaMatriculasPorEstudante);
    }catch(erro){
      res.status(500).json({erro: erro.message});
    }
  }
  async pegaCursosLotados(req,res){
    const lotacaoCurso = 2;
    try {
      const cursosLotados = await matriculaServices.pegaEcontaRegistros({ 
        where:{
          status: 'matriculado'
        },
        attributes: ['curso_id'],
        group: ['curso_id'],
        having: Sequelize.literal(`count(curso_id) >= ${lotacaoCurso}`)
      });
      return res.status(200).json(cursosLotados);
    }catch(erro){
      res.status(500).json({erro: erro.message});
    }
  }
}


module.exports = MatriculaController;

