import Ride from "../models/ride.js";
import User from "../models/associations.js";
import  calculateDistance from "../utils/calculateDistance.js";
import estimateFare from "../utils/estimateFare.js";
import jwt from "jsonwebtoken";


// Request a ride
export const requestRide = async (req, res) => {
    try {
        const {pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude, pickupAddress,dropoffAddress } = req.body;
        const userId = req.user.id;

        // Validate input
        if (!pickupLatitude || !pickupLongitude || !dropoffLatitude || !dropoffLongitude) {
            return res.status(400).json({ message: "Pickup and dropoff coordinates are required" });
        }

        // Check if user exists
        const user = await User.findByPk(req.user.id);
        if (!user || (user.role !== 'user')) {
            return res.status(404).json({ message: "User not found"});
        }

        // Calculate the distance between the pickup and dropoff locations
        const distanceKm = calculateDistance(
            pickupLatitude,
            pickupLongitude,
            dropoffLatitude,
            dropoffLongitude
        );

        //  Estimate duration and fare
        const estimatedDuration = Math.ceil(distanceKm * 2) + 5;
        const estimatedFare = estimateFare(distanceKm, estimatedDuration);

        // Create a new ride
        const newRide = await Ride.create({
            userId,
            pickupLatitude,
            pickupLongitude,
            dropoffLatitude,
            dropoffLongitude,
            pickupAddress,
            dropoffAddress,
            status: 'PENDING',
            estimatedFare,
            distance: distanceKm,
            // duration: estimatedDuration
        });

        return res.status(201).json({ Message: "Ride requested successfully.", Ride: newRide });
    } catch(error) {
        console.error(error);
        return res.status(500).json({ Message: "An error occurred while requesting the ride." });
    }
};


export const getRideDetails = async (req, res) => {
    try{
        const rideId = req.params.id;
        const ride = await Ride.findByPk(rideId);
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(403).json({Message : "You are not authorized to do this!"});
        }
        const decoded = jwt.decode(token);
        req.user = decoded;
        if(!ride){
            return res.status(404).json({message : "Ride not found!"});
        }

        // Check if the user is authorized to view the ride details
        if (req.user.role === 'user' && ride.userId !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to view this ride"});
        }
          
        if (req.user.role === 'driver' && ride.driverId !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to view this ride" });
        }


        return res.status(200).json({message : "Ride details retrieved successfully!", Ride : ride});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message : "An error occurred while retrieving ride details."});
    }
};

// Driver responds to ride request
export const respondToRide = async (req, res) => {
  const rideId = req.params.id;
  const driverId = req.user.id; 
  const { response } = req.body;

    try{
        const ride = await Ride.findByPk(rideId);
        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        if (ride.status !== 'PENDING') {
            return res.status(400).json({ message: "Ride is no longer available" });
        }

        const driver = await User.findByPk(driverId);
        if (!driver || (driver.driverStatus !== 'available')) {
            return res.status(403).json({ message: "Driver is not available" });
        }

        if (response === 'accept') {
            ride.driverId = driverId;
            ride.status = 'DRIVER_ASSIGNED';
            await ride.save();

            // Update driver status
            driver.status = 'unavailable';
            await driver.save();
            return res.status(200).json({ message: "Ride accepted successfully", ride });
        } else if (response === 'reject') {
            return res.status(200).json({ message: "Ride rejected" });
        } else {
            return res.status(400).json({ message: "Invalid response. Must be 'accept' or 'reject'" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong while responding to the ride" });
  }
};

// Driver arrives at pickup (change status to DRIVER_ARRIVED)
export const driverArrives = async(req, res) =>{
    try{
        const rideId = req.params.id;
        const ride = await Ride.findByPk(rideId);
        if(!ride){
            return res.status(404).json({message : "Ride not found!"});
        }
        if(ride.driverId !== req.user.id){
            return res.status(403).json({message : "You are not authorized to update this ride!"});
        }
        if(ride.status !== "DRIVER_ASSIGNED"){
            return res.status(400).json({message : "Driver has not been assigned to this ride!"});
        }
        ride.status = "DRIVER_ARRIVED";
        await ride.save();
        return res.status(200).json({message : "Driver has arrived at the pickup location!", Ride : ride});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message : "An error occurred while updating the ride status."});
    }
};

export const startRide = async(req, res) =>{
    try{
        const rideId = req.params.id;
        const ride = await Ride.findByPk(rideId);
        if(!ride){
            return res.status(404).json({message : "Ride not found!"});
        }
        if(ride.driverId !== req.user.id){
            return res.status(403).json({message : "You are not authorized to update this ride!"});
        }
        if(ride.status !== "DRIVER_ARRIVED"){
            return res.status(400).json({message : "Driver has not arrived at the pickup location!"});
        }
        ride.status = "IN_PROGRESS";
        ride.pickupTime = new Date(); // Set the pickup time to the current time
        await ride.save();
        return res.status(200).json({message : "Ride has started!", Ride : ride});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message : "An error occurred while updating the ride status."});
    }
}

export const completeRide = async(req, res) =>{
    try{
        const rideId = req.params.id;
        const ride = await Ride.findByPk(rideId);
        if(!ride){
            return res.status(404).json({message : "Ride not found!"});
        }
        if(ride.driverId !== req.user.id){
            return res.status(403).json({message : "You are not authorized to update this ride!"});
        }
        if(ride.status !== "IN_PROGRESS"){
            return res.status(400).json({message : "Ride is not in progress!"});
        }

        // Calculate final fare based on distance and duration
        ride.status = "COMPLETED";
        ride.dropoffTime = new Date(); // Set the dropoff time to the current time
        const durationMinutes = Math.ceil((ride.dropoffTime- ride.pickupTime) / (1000 * 60)); //find duration to minutes
        const estimatedFare = estimateFare(ride.distance, durationMinutes);
        ride.duration = durationMinutes; // Update the ride duration
        ride.finalFare = estimatedFare; // Set the final fare to the estimated fare
        await ride.save();
        return res.status(200).json({message : "Ride has been completed!", Ride : ride});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message : "An error occurred while updating the ride status."});
    }
}


export const cancelRide = async(req, res) =>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(403).json({Message : "You are not authorized to do this!"});
    }
    const decoded = jwt.decode(token);
    req.user = decoded;
    try{
        const rideId = req.params.id;
        const { cancellationReason } = req.body; // Get cancellation reason from request body
        const ride = await Ride.findByPk(rideId);
        if(!ride){
            return res.status(404).json({message : "Ride not found!"});
        }
        if(!["PENDING", "DRIVER_ASSIGNED", "DRIVER_ARRIVED"].includes(ride.status)){
            return res.status(400).json({message : "Ride cannot be cancelled!"});
        }
        if(ride.userId !== req.user.id && ride.driverId !== req.user.id){
            return res.status(403).json({message : "You are not authorized to cancel this ride!"});
        }
        ride.status = "CANCELLED";
        ride.cancellationReason = cancellationReason || "No reason provided"; // Set the cancellation reason
        ride.cancelledBy = req.user.role; // Set who cancelled the ride (user or driver)
        await ride.save();
        return res.status(200).json({message : "Ride has been cancelled!", Ride : ride});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message : "An error occurred while cancelling the ride."});
    }
}

// Get User ride history
export const getUserRideHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const rides = await Ride.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({ message: "Ride history retrieved successfully", rides });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while retrieving ride history" });
    }
};

// Get Driver ride history
export const getDriverRideHistory = async (req, res) => {
    try {
        const driverId = req.user.id;
        const rides = await Ride.findAll({
            where: { driverId },
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({ message: "Ride history retrieved successfully", rides });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while retrieving ride history" });
    }
};