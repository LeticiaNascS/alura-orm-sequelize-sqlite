const dataSource = require ('../models');
 
class Services{
  constructor(nomeDoModel)
  {  
    this.model = nomeDoModel;
  }
  async pegaTodosOsRegistros(){
    return dataSource[this.model].findAll();
  }

  async pegaRegistroPorID(id){
    return dataSource[this.model].findByPk(id);
  }

  async atualizaRegistro(dadosAtualizados, id) {
    const listaDeRegistrosAtualizados =  dataSource[this.model].update(dadosAtualizados, {
      where: { id: id }
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