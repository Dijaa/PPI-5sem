import sequelize from '../database/connection.js';
import { DataTypes } from 'sequelize';

import Orcamento from './orcamentoModel.js';
import Equipamento from './equipamentoModel.js';
import PrecoImpressao from './precoImpressao.js';
import TaxaFixa from './taxaFixaModel.js';


/*
Table orçamento_equipamento {
    id integer [primary key]
    orçamento_id integer
    equipamento_id integer
    qtd_copias integer
    qtd integer
     preco_impressao_id integer
    taxa_fixa_id integer
    
  }
*/
const OrcamentoEquipamento = sequelize.define('orcamento_equipamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orcamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Orcamento,
            key: 'id'
        },
    },
    equipamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Equipamento,
            key: 'id'
        },
    },
    qtd_copias: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    qtd: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco_impressao_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PrecoImpressao,
            key: 'id'
        },
    },
    taxa_fixa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TaxaFixa,
            key: 'id'
        },
    }
});

export default OrcamentoEquipamento;