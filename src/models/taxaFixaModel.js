import sequelize from '../database/connection.js';
import { DataTypes } from 'sequelize';

const TaxaFixa = sequelize.define('taxa_fixa', {
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

export default TaxaFixa;