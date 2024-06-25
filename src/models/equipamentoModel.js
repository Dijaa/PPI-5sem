import sequelize from '../database/connection.js';
import { DataTypes } from 'sequelize';

const Equipamento = sequelize.define(
    "equipamentos",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        resolucao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        capacidade_de_memoria: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nfc: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        data_compra: {
            type: DataTypes.DATE,
            allowNull: false
        },
        painel_controle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        frente_verso: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }
);

export default Equipamento;