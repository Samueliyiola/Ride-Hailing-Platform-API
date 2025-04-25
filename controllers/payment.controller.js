// src/controllers/paymentController.js
import Payment from '../models/payment.js';
import Ride from '../models/ride.js';
import { initiatePaystackPayment } from '../utils/paymentUtils.js'; // utility function to call Paystack API

// 1. POST /ride/:rideId/pay – Initiate Payment
export const initiatePayment = async (req, res) => {
  const { rideId } = req.params;
  const { paymentMethod, email } = req.body;

  // Check if the ride exists and is completed
  const ride = await Ride.findByPk(rideId);
  if (!ride) return res.status(404).json({ error: 'Ride not found' });
  const amountPaid = ride.finalFare; // Assuming totalFare is the amount to be paid
  if (!amountPaid) return res.status(400).json({ error: 'Ride fare not available' });

  if (ride.status !== 'COMPLETED') {
    return res.status(400).json({ error: 'Ride must be completed to make a payment' });
  }

  try {
    let paymentResponse;
    
    // For card/transfer payments, use Paystack
    if (paymentMethod === 'card' || paymentMethod === 'transfer') {
      paymentResponse = await initiatePaystackPayment(amountPaid, email);
        await Payment.create({
        userId: ride.userId,
        driverId : ride.driverId,
        rideId,
        amountPaid,
        paymentMethod,
        transactionId: paymentResponse.data.reference, 
        paymentStatus: 'pending',
      });
      return res.status(200).json({ authorization_url: paymentResponse.data.authorization_url });
    }

    // For cash payment, just create the payment record
    if (paymentMethod === 'cash') {
      const payment = await Payment.create({
        userId: ride.userId,
        driverId: ride.driverId,
        rideId: rideId,
        amountPaid: amountPaid,
        paymentMethod: paymentMethod,
        paymentStatus: 'completed', // Since it's cash, it's considered paid
        paidAt: new Date(),
      });
      return res.status(200).json({ message: 'Payment completed successfully', payment });
    }

    return res.status(400).json({ error: 'Invalid payment method' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Payment initiation failed' });
  }
};

// 2. POST /payment/webhook/paystack – Handle Paystack webhook
export const handlePaystackWebhook = async (req, res) => {
  const event = req.body;

  // Ensure the webhook is from Paystack
  if (event.event !== 'charge.success') {
    return res.status(400).json({ error: 'Invalid event' });
  }

  const { reference, status } = event.data;

  try {
    // Find the payment record using the reference
    const payment = await Payment.findOne({ where: { transactionId: reference } });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Update payment status based on Paystack response
    if (status === 'success') {
      payment.paymentStatus = 'completed';
      payment.paidAt = new Date();
      await payment.save();
    } else {
      payment.paymentStatus = 'failed';
      payment.failureReason = event.data.gateway_response;
      await payment.save();
    }

    return res.status(200).json({ message: 'Payment status updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error handling webhook' });
  }
};

// Retrieve payment info by ID
export const getPaymentInfo = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });

    return res.status(200).json({ payment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching payment info' });
  }
};
































































// import Payment from "../models/payment.js";

// export const getUserPaymentsHistory = async(req, res) =>{
//     try {
//         const userId = req.params.id;
//         const payments = Payment.findAll({where : {userId}});
//         return res.status(200).json({message :" Payment history retrieved successfully!", payments});
//     }catch (error) {
//         console.error(error);
//         return res.status(500).json({message : "An error occured while fetching payments"});
//     }
// };

// export const getDriverPaymentsHistory = async(req, res) =>{
//     try{
//         const driverId = req.params.id;
//         const payments = Payment.findAll({where : {driverId}});
//         return res.status(200).json({message :" Payment history retrieved successfully!", payments});
//     }
//     catch(error){
//         console.error(error);
//         return res.status(500).json({message : "An error occured while fetching payments"});
//     }
// };

