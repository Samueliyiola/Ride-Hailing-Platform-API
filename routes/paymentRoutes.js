// src/routes/paymentRoutes.js
import express from 'express';
import { initiatePayment, handlePaystackWebhook, getPaymentInfo } from '../controllers/payment.controller.js';

const router = express.Router();

// 1. POST /ride/:rideId/pay – Initiate payment for a ride (cash, transfer, or card)
router.post('/ride/:rideId/pay', initiatePayment);

// 2. POST /payment/webhook/paystack – Handle Paystack webhook for payment status updates
router.post('/webhook/paystack', handlePaystackWebhook);

// 3. GET /payment/:paymentId – Retrieve payment information by payment ID
router.get('/:paymentId', getPaymentInfo);

export default router;
