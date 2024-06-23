import  Sequelize  from "../database/connection.js";
import { DataTypes } from "sequelize";

const Taxa = Sequelize.define(
    "taxas",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        taxa: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
    },

);

export default Taxa;