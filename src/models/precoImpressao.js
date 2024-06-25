import sequelize from '../database/connection.js';
import { DataTypes } from 'sequelize';

const PrecoImpressao = sequelize.define('preco_impressao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    valor: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
});

export default PrecoImpressao;