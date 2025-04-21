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
        return res.status(200).json({message : "Ride details retrieved successfully!", Ride : ride});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message : "An error occurred while retrieving ride details."});
    }
};