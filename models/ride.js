import sequelize from "../config/sequelize.js";
import { Sequelize, DataTypes} from "sequelize";

const Ride = sequelize.define('Ride', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
    },
    driverId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
    },
    pickupLatitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
        index: true
    },
    pickupLongitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
        index: true
    },
    dropoffLatitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false
    },
    dropoffLongitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false
    },
    pickupAddress: {
        type: DataTypes.STRING
    },
    dropoffAddress: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM(
          'PENDING',         // Initial request
          'DRIVER_ASSIGNED', // Driver has accepted
          'DRIVER_ARRIVED',  // Driver at pickup location
          'IN_PROGRESS',     // Ride in progress
          'COMPLETED',       // Ride completed
          'CANCELLED'        // Cancelled by user or driver
        ),
        defaultValue: 'PENDING'
    },
    estimatedFare: {
        type: DataTypes.DECIMAL(10, 2)
    },
    finalFare: {
        type: DataTypes.DECIMAL(10, 2)
    },
    distance: {
        type: DataTypes.DECIMAL(10, 2)  // in kilometers
    },
    pickupTime:{
        type: DataTypes.DATE
    },
    dropoffTime: {
        type: DataTypes.DATE
    },
    duration: {
        type: DataTypes.INTEGER  // in minutes
    },
    cancelledBy:{
        type: DataTypes.ENUM(
            'user',   // Ride cancelled by user
            'driver'  // Ride cancelled by driver
        )
    },
    cancellationReason:{
        type : DataTypes.STRING
    },
    rating : {
        type : DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});
  
Ride.associate = (models) => {
    Ride.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Ride.belongsTo(models.User, { as: 'driver', foreignKey: 'driverId' });
    Ride.hasOne(models.Payment, { foreignKey: 'rideId' });
    Ride.hasOne(models.Rating, { foreignKey: 'rideId' });
};


export default Ride;