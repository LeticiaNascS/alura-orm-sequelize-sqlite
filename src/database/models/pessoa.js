'use strict';
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
    nome: DataTypes.STRING,
    email: {type: DataTypes.STRING, // validaçao de e-mail
      validate: {
        isEmail: {
          args: true,
          msg: 'formato do e-mail inválido'
        }
      }
    },
    cpf: DataTypes.STRING,
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