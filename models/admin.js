import sequelize  from "../config/sequelize.js";   
import { Sequelize, DataTypes } from "sequelize";


const Admin = sequelize.define("Admin", {
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stateOfOrigin: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Admin;