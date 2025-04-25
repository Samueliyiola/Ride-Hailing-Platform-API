import sequelize from "../config/sequelize.js";
import {DataTypes, Sequelize} from "sequelize";

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  rideId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Rides',
      key: 'id',
    },
  },
  amountPaid: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.ENUM("cash", "transfer", "card"),
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.ENUM("pending", "completed", "failed"),
    defaultValue: "pending",
    allowNull: false,
  },
  paidAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  failureReason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
});

export default Payment;

































// const Payment = sequelize.define("Payment", {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'Users',
//             key: 'id'
//         }
//     },
//     driverId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'Users',
//             key: 'id'
//     },
//     rideId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'Rides',
//             key: 'id'
//         }
//     },
//     amountPaid: {
//         type: DataTypes.DECIMAL(10, 2),
//         allowNull: false
//     },
//     paymentMethod: {
//         type: DataTypes.ENUM("cash", "transfer", "card"),
//         allowNull: false
//     },
//     paymentStatus: {
//         type: DataTypes.ENUM("pending", "completed", "failed"),
//         defaultValue: "pending",
//         allowNull : false
//     },
//     paidAt: {
//     type: DataTypes.DATE,
//     allowNull: true
//     }
// }})


// export default Payment;