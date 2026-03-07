const dataSource = require ('../database/models');
 
class Services{
  constructor(nomeDoModel)
  {  
    this.model = nomeDoModel;
  }
  async pegaTodosOsRegistros(where = {}){
    return dataSource[this.model].findAll({where: {...where}});
  }

  async pegaRegistrosPorEscopo(escopo){
    return dataSource[this.model].scope(escopo).findAll();  
  }

  async pegaRegistroPorID(id){
    return dataSource[this.model].findByPk(id);
  }
  async pegaUmRegistro(where){
    return dataSource[this.model].findOne({where: {...where}});
  }

  async pegaEcontaRegistros(where){
    return dataSource[this.model].findAndCountAll({where: {...Number}, limit: 2, order: [['id', 'ASC']]});
  }

  async atualizaRegistro(dadosAtualizados, where) {
    const listaDeRegistrosAtualizados =  dataSource[this.model].update(dadosAtualizados, {
      where: { ...where}
    });

    if (listaDeRegistrosAtualizados[0] === 0) {
      return false;

    }
    return true;
  }

  async criarRegistro(dadosNovos) {
    return dataSource[this.model].create(dadosNovos);
  }


  async excluirRegistro(id){
    return dataSource[this.model].destroy({
      where: { id: id }
    });
  }
}

module.exports = Services;