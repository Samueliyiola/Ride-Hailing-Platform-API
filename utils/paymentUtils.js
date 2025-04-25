
import axios from 'axios';

export const initiatePaystackPayment = async (amount, email) => {
  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize', // Paystack API endpoint
      {
        email: email,
        amount: amount * 100, // Amount in kobo, Paystack expects it in subunit (e.g., Naira to Kobo)
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Paystack secret key from environment
        },
      }
    );

    return response.data; // Contains details like authorization URL for the user to complete payment
  } catch (error) {
    console.error('Error initiating Paystack payment:', error);
    throw new Error('Error initiating Paystack payment');
  }
};
