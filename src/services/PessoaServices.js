const Services = require('./Services.js');
const dataSource = require('../database/models');
class PessoaServices extends Services {

  constructor(){
    super('Pessoa');
    this.matriculaServices = new Services ('Matricula');
  }
  async pegaMatriculasAtivasPorEstudante(id){
    const estudante = await super.pegaRegistroPorID(id);
    
    const listaMatriculas = await estudante.getAulasMatriculadas();

    return listaMatriculas;
  }

  async pegaTodasAsMatriculasPorEstudante(id){
    const estudante = await super.pegaRegistroPorID(id);
    
    const listaMatriculas = await estudante.getTodasAsMatriculas();

    return listaMatriculas;
  }
  



  async pegaPessoasEscopoTodos(){
    const listaPessoas = await super.pegaRegistrosPorEscopo('todosOsRegistros');
    return listaPessoas;
  }

  async cancelaPessoasEMatriculas(estudanteId){
    console.log('ID recebido no service:', estudanteId);
    return dataSource.sequelize.transaction(async(transacao) => {await super.atualizaRegistro({ativo:false}, {id: estudanteId}, {transaction: transacao});
      await this.matriculaServices.atualizaRegistro({status: 'cancelado'}, {estudante_id:estudanteId},{transaction: transacao});
 
    });
  }
}

module.exports = PessoaServices;
