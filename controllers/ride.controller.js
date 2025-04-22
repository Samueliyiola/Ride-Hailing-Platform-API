import Ride from "../models/ride.js";
import User from "../models/associations.js";
import  calculateDistance from "../utils/calculateDistance.js";
import estimateFare from "../utils/estimateFare.js";


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
            duration: estimatedDuration
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
        if(!ride){
            return res.status(404).json({message : "Ride not found!"});
        }

        // Check if the user is authorized to view the ride details
        if (req.user.role === 'USER' && ride.userId !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to view this ride"});
        }
          
        if (req.user.role === 'DRIVER' && ride.driverId !== req.user.id) {
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
        // Optionally: log rejection or notify system
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
