
class Controller {
  constructor(entidadeService){
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req,res){
    try{
      const listaDeRegistros = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRegistros);

    }catch (erro) {
      console.log(erro);
      return res.status(500).send( 'Erro ao listar pessoas');
    }
  }
}

module.exports = Controller;