import Driver from "./drivers.js";
import Vehicle from "./vehicles.js"; 

Driver.hasOne(Vehicle, {
    onDelete : "CASCADE"
});
Vehicle.belongsTo(Driver);

export{Driver, Vehicle};