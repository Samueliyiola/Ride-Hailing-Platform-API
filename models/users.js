import sequelize  from "../config/sequelize.js";   
import { Sequelize, DataTypes } from "sequelize";


const User = sequelize.define("User", {
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
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    gender : {
        type : DataTypes.ENUM("male", "female"),
        allowNull : false
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
    address : {
        type : DataTypes.STRING,
        allowNull : false
    },
    role : {
        type : DataTypes.ENUM("user", "driver", "admin"),
        defaultValue: "user",
        allowNull : false
    },
    driverStatus: {
        type: DataTypes.ENUM("available", "unavailable"),
        allowNull: true
    }
});

export default User;