import {Sequelize, DataTypes} from "sequelize";
import sequelize from "../config/sequelize.js";

const VerificationCode = sequelize.define("VerificationCode", {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    code: {
        type : DataTypes.STRING,
        allowNull : false
    },
    expiresAt : {
        type : DataTypes.DATE,
        allowNull : false
    }
});

export default VerificationCode;