class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
    try {
      const listaDeRegistros =
        await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRegistros);
    } catch (erro) {
      return res.status(500).send({erro: erro.message});
    }
  }

  async pegaUmPorId(req,res){
    const {id} = req.params;

    try{
      const umRegistro = await this.entidadeService.pegaRegistroPorId(Number(id));
      return res.status(200).json(umRegistro);

    }catch(erro){
      res.status(500).json({erro: erro.message});
    }
  }

  async atualiza(req,res){
   
    const { id } = req.params;
    const dadosAtualizados = req.body;    
    
    try{
      const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, Number (id));

      if(!foiAtualizado){
        return res.status(400).json({mensagem:'Registro não foi atualizado'});
      }
      return res.status(200).json({mensagem: 'Registro atualizado com sucesso'});
    } catch (erro) {
      return res.status(500).send({erro: erro.message});
    }
  }

  async criar (req,res){
    const dadosNovos = req.body;

    try{
      const dadosCriados = await this.entidadeService.criarRegistro(dadosNovos);

      if(!dadosCriados){
        return res.status(400).json({mensagem: 'Erro ao criar'});

      }
      return res.status(200).json({mensagem: 'Dado criado com sucesso'});

    } catch (erro) {

      res.status(500).json({erro: erro.message});
    }
  }

  async deletar (req,res){
    const { id } = req.params;

    try{
      await this.entidadeService.excluirRegistro(Number(id));

      return res.status(200).json({mensagem:'Dados deletados com sucesso'});

    }catch(erro) {

      res.status(500).json({erro: erro.message});
    }
  }
}

module.exports = Controller;
