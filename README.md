# Ride-Hailing API

## Overview

The Ride-Hailing API supports a platform for booking rides, managing drivers, and calculating fares. It offers a suite of functionalities such as user authentication, ride booking, driver management, and payment processing. This API is built using **Node.js**, **Express.js**, **Sequelize ORM**, and **Redis** for real-time features like driver location updates.

---

## Features

- **User Authentication**: Register, login, and manage JWT-based sessions.
- **Driver and Vehicle Management**: Register drivers, manage vehicle information, and track driver availability and locations.
- **Ride Booking & Management**: Passengers can book rides, track ride status, and view ride history.
- **Real-time Location Updates**: Driver locations are tracked in real-time using **Redis** for fast access and updates.
- **Fare Calculation**: Dynamic fare calculations based on distance, time, and demand.
- **Payment Integration**: Integrated with **Paystack** for seamless ride payments.
- **Admin Dashboard**: Admin can manage users, drivers, and ride statuses.

---

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL (Sequelize ORM)
- **Authentication**: JSON Web Tokens (JWT)
- **Real-time Updates**: Redis
- **Payment Integration**: Paystack
- **Middleware**: Express Rate Limiter, Custom Authentication Middlewares
- **Testing**: Mocha/Chai for unit tests

---

## Getting Started

### Prerequisites

1. **Node.js** (v14 or later): [Node.js Download](https://nodejs.org/)
2. **MySQL**: [MySQL Setup](https://www.mysql.com/)
3. **Docker** (Optional for containerization): [Docker Setup](https://www.docker.com/)
4. **Redis**: Ensure Redis is running for real-time features.
5. Create a `.env` file and add the following variables:
   ```
   DB_NAME=ride_hailing_db
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret
   PAYSTACK_SECRET_KEY=your_paystack_secret_key
   PORT=3000
   ```

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Samueliyiola/ride-hailing-api.git
   cd ride-hailing-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set up the Database**:
   - Create a MySQL database as defined in your `.env` file.
   - Run the Sequelize migrations:
     ```bash
     npx sequelize-cli db:migrate
     ```

4. **Start the Server**:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:3000`.

---

## API Endpoints

### Authentication

- **POST /api/v1/users/register**: Register a new user.
- **POST /api/v1/users/login**: Log in and receive a JWT token.
- **POST /api/v1/users/verify-otp**: Verify OTP for user registration.

### Drivers and Vehicles

- **POST /api/v1/driver/register**: Register a new driver (admin-only).
- **POST /api/v1/driver/login**: Driver login.
- **POST /api/v1/driver/update-location**: Update driver location (driver-only).
- **PATCH /api/v1/driver/availability**: Set driver availability status.

### Rides

- **POST /api/v1/rides/request**: Request a ride by a user.
- **PATCH /api/v1/rides/respond/:id**: Driver responds to a ride request.
- **PATCH /api/v1/rides/start-ride/:id**: Start a ride.
- **PATCH /api/v1/rides/complete-ride/:id**: Complete a ride.
- **PATCH /api/v1/rides/cancel-ride/:id**: Cancel a ride.
- **GET /api/v1/rides/history/:id**: Get ride history for a user.
- **GET /api/v1/rides/driver-history/:id**: Get ride history for a driver.

### Payments

- **POST /api/v1/payment/ride/:rideId/pay**: Initiate payment for a ride.
- **POST /api/v1/payment/webhook/paystack**: Handle Paystack webhook for payment updates.
- **GET /api/v1/payment/:paymentId**: Retrieve payment information.

---

## WebSocket Notifications

- **Drivers are alerted** when a passenger requests a ride within their radius.
- **Driver locations** are updated in real-time using Redis.

---

## Testing

To run the test suite:

```bash
npm test
```

Make sure to set up the `.env.test` file for testing configurations.

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Contact

For inquiries or support, please contact [samueliyiola13@gmail.com].
