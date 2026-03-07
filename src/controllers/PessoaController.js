const Controller = require('./Controller.js');
const PessoaServices = require ('../services/PessoaServices.js');

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor(){
    super (pessoaServices);
  }

  async pegaMatriculasAtivas(req,res){
     
    const { estudante_Id } = req.params;
    
    try{
      const listaMatriculas = await pessoaServices.pegaMatriculasAtivasPorEstudante(Number(estudante_Id));
      return res.status(200).json(listaMatriculas);
    }catch(erro){
      res.status(500).json({erro: erro.message});
    }

  }

  async pegaTodasAsMatriculas(req,res){
    const { estudante_Id } = req.params;
    try{
      const listaMatriculas = await pessoaServices.pegaTodasAsMatriculasPorEstudante(Number(estudante_Id));
      return res.status(200).json(listaMatriculas);
    }catch(erro){
      res.status(500).json({erro: erro.message});
    }
  }


  async pegaTodasAsPessoas(req,res){
    try{
      const listaTodasAsPessoas = await pessoaServices.pegaPessoasEscopoTodos();
      return res.status(200).json(listaTodasAsPessoas);

    }catch(erro){
      res.status(500).json({erro: erro.message});
    }
  }
  async cancelaRegistroEstudante(req,res){
    const {estudante_Id} = req.params;
    try{
      await pessoaServices.cancelaPessoasEMatriculas(Number(estudante_Id));
      return res.status(200).json({mensagem: 'Matriculas canceladas'});

    }catch(erro){
      res.status(500).json({erro: erro.message});
    }
  }
}


module.exports = PessoaController;

