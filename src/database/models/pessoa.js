'use strict';

const isCpfValido = require ('../../utils/validaCpfHelper.js');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    
    static associate(models) {
      Pessoa.hasMany(models.Curso, {foreignKey: 'docente_id' });
    
      Pessoa.hasMany(models.Matricula, {foreignKey: 'estudante_id', as: 'aulasMatriculadas'});}
  
  }

  Pessoa.init({
    nome: {type:DataTypes.STRING, // validação para tamanho minimo e maximo do nome
      validate: {
        len:{
          args: [3,30],
          msg: 'o campo nome deve conter no minimo 3 caracteres'
        }
      }
    },
    email: {type: DataTypes.STRING, // validaçao de e-mail
      validate: {
        isEmail: {
          args: true,
          msg: 'formato do e-mail inválido'
        }
      }
    },
    cpf: {type: DataTypes.STRING, //validacao de cpf 
      validate: {
        cpfEhValido : (cpf) => {
          if (!isCpfValido(cpf)) throw new Error ('Numero de cpf invalido');
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    paranoid: true, 
    defaultScope:{ //escopo utilizado para filtrar apenas pessoas ativas 
      where: {
        ativo:true,

      }
    },
    scopes:{ //escopo utilizado para filtrar todos os registros de pessoas ativas ou inativas
      todosOsRegistros:{
        where: {

        }
      }
    }

  });
  return Pessoa;
};