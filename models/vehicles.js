import sequelize  from "../config/sequelize.js";   
import { Sequelize, DataTypes } from "sequelize";


const Vehicle = sequelize.define("Vehicle", {
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    manufacturer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plateNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});


export default Vehicle;