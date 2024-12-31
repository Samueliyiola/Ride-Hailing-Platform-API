# Ride-Hailing API

## Overview
This API is designed to support a ride-hailing platform, enabling features like user authentication, drivers management, vehicle management, ride booking, and fare calculation. Built with **Node.js**, **Express.js**, and **Sequelize ORM**, it ensures scalability and efficiency.

---

## Features
- **User Authentication**: Sign-up, login, and secure JWT-based authentication.
- **Driver and Vehicle Management**: Manage drivers, vehicles, and their availability.
- **Ride Booking**: Book rides, track ride statuses, and manage ride histories.
- **Fare Calculation**: Dynamic fare calculations based on distance, time, and demand.
- **Admin Dashboard**: Administrative operations such as managing users, drivers, and rides.

---

## Technology Stack
- **Backend**: Node.js with Express.js
- **Database**: MySQL (via Sequelize ORM)
- **Authentication**: JSON Web Tokens (JWT)
- **Documentation**: Postman

---

## Getting Started

### Prerequisites
1. [Node.js](https://nodejs.org/) (v14 or later)
2. [MySQL](https://www.mysql.com/)
3. [Docker](https://www.docker.com/) (optional for containerization)
4. A `.env` file with the following variables:
    ```
    DB_NAME=ride_hailing_db
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    DB_HOST=localhost
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Samueliyiola/ride-hailing-api.git
    cd ride-hailing-api
    ```

2. Install dependencies:
    ```bash
    npm install express sequelize sql2 dotenv jsonwebtoken bcrypt 
    ```

3. Setup the database:
    - Create a MySQL database matching the `DB_NAME` in your `.env` file.
    - Run the Sequelize migrations:
        ```bash
        npx sequelize-cli db:migrate
        ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Open the API at `http://localhost:3000`.

---

## API Endpoints

### Authentication
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in and receive a JWT token.

### Drivers and Vehicles
- **POST /api/drivers**: Register a new driver.
- **GET /api/drivers/:id**: Get details of a specific driver.
- **POST /api/vehicles**: Add a new vehicle.
- **GET /api/vehicles/:id**: Get details of a specific vehicle.

### Rides
- **POST /api/rides**: Book a new ride.
- **GET /api/rides/:id**: Get details of a specific ride.
- **GET /api/rides/history**: Get a user's ride history.

---

## Testing
- Run the test suite:
    ```bash
    npm test
    ```
- Ensure your `.env.test` file is configured for the testing environment.

---


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
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact
For inquiries or support, please contact [samueliyiola13@gmail.com].

