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
      return res.status(500).send('Erro ao listar pessoas');
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
      return res.status(500).send('Erro ao tentar atualizar os dados');
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

      res.status(500).json({mensagem: 'Erro no servidor'});
    }
  }

  async deletar (req,res){
    const { id } = req.params;

    try{
      await this.entidadeService.excluirRegistro(Number(id));

      return res.status(200).json({mensagem:'Dados deletados com sucesso'});

    }catch(erro) {

      res.status(500).json({mensagem: 'Erro no servidor'});
    }
  }
}

module.exports = Controller;
