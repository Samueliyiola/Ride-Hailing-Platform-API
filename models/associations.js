import User from "./users.js";
import Vehicle from "./vehicles.js"; 

User.hasOne(Vehicle, {
    onDelete : "CASCADE",
    onUpdate : "CASCADE"
});
Vehicle.belongsTo(User);

export{User, Vehicle};