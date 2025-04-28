// Store the mapping of driverId to socketId
const driverSocketMap = new Map();

// Function to set the socketId for a driver
const setDriverSocketId = (driverId, socketId) => {
    driverSocketMap.set(driverId, socketId);
};

// Function to get the socketId for a driver
const getDriverSocketId = (driverId) => {
    return driverSocketMap.get(driverId);
};

// Function to remove the socketId when a driver disconnects
const removeDriverSocketId = (driverId) => {
    driverSocketMap.delete(driverId);
};

export { setDriverSocketId, getDriverSocketId, removeDriverSocketId };
