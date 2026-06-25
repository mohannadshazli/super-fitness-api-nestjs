# Super Fitness API (NestJS)

This repository contains the backend API for the Super Fitness application, a comprehensive platform for managing workouts, diet, and fitness goals. Built with the NestJS framework, it provides a scalable, modular, and efficient server-side solution.

## ✨ Features

- **User Authentication & Authorization**: Secure user registration, login with JWT (Access & Refresh Tokens), and password management (OTP-based reset).
- **Profile Management**: Multi-step user onboarding to collect data like age, weight, height, gender, fitness goals, and activity level.
- **Workout Engine**:
  - Create and manage custom workouts and exercises.
  - Personalized workout recommendations based on user BMI and goals.
  - Filter exercises by specific goals (e.g., `LOSE_WEIGHT`, `GAIN_MUSCLE`).
- **Food Recommendation System**:
  - Integrates with the Spoonacular API to fetch nutritional data.
  - Delivers tailored meal suggestions for breakfast, lunch, and dinner.
  - A custom scoring algorithm ranks food based on user's caloric needs, macros, and fitness objectives.
- **AI Smart Coach**:
  - Real-time chat functionality using WebSockets (Socket.IO).
  - Integration with the Groq API (Llama 3.1) to provide an AI-powered assistant.
  - Persistent chat history for each user.
- **File Uploads**: Supports image and video uploads for exercises to Cloudinary.
- **Background Jobs**: Uses Bull for scheduled jobs, such as cleaning up expired OTPs and authentication tokens.
- **API Documentation**: Automatically generated and interactive API documentation with Swagger (OpenAPI).

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.IO & WebSockets
- **Job Queue**: Bull & Redis
- **Caching**: Redis
- **File Storage**: Cloudinary
- **External APIs**: Spoonacular (Food), Groq (AI)
- **Email**: Nodemailer

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 20.x)
- npm
- PostgreSQL
- Redis

### 1. Clone the Repository

```bash
git clone https://github.com/mohannadshazli/super-fitness-api-nestjs.git
cd super-fitness-api-nestjs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root of the project and add the following environment variables.

```env
# Application
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=super_fitness_db

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION_TIME=1d
JWT_REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
JWT_REFRESH_TOKEN_EXPIRATION_TIME=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# External APIs
SPOONACULAR_KEY=your_spoonacular_api_key
GROQ_API_KEY=your_groq_api_key

# Nodemailer
MAIL_HOST=your_mail_host
MAIL_PORT=your_mail_port
MAIL_USER=your_mail_user
Node_Mailer_Main_Pass=your_mail_password
```

### 4. Running the Application

```bash
# Development mode with hot-reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

### 5. Running Tests

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📖 API Documentation

Once the application is running, you can access the interactive Swagger API documentation at:

`http://localhost:3000/api`

This documentation provides a complete list of available endpoints, their required parameters, and allows you to test them directly from your browser.
