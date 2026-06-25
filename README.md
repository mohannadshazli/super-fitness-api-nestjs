# Super Fitness API

A scalable fitness platform backend built with NestJS that helps users manage workouts, nutrition plans, fitness goals, and interact with an AI-powered fitness coach.

## Overview

Super Fitness API is a backend application designed to power a modern fitness platform. The system provides secure authentication, workout management, nutrition recommendations, real-time AI coaching, and profile management features.

The project was developed collaboratively using Agile/Scrum methodologies, with Jira used for sprint planning, task management, and team collaboration.

---

## Features

### Authentication & Security

- User registration and login
- JWT Authentication (Access & Refresh Tokens)
- Password reset via OTP verification
- Secure password change workflow
- Email change with OTP verification
- Session and token invalidation after sensitive account updates

### User Profile Management

- Multi-step onboarding process
- Fitness goal selection
- Activity level tracking
- User profile management
- BMI-related data collection

### Workout Management

- Workout creation and management
- Exercise management
- Personalized workout recommendations
- Goal-based exercise filtering
- Support for various fitness objectives:
  - Weight Loss
  - Muscle Gain
  - General Fitness

### Nutrition Recommendation System

- Spoonacular API integration
- Personalized meal recommendations
- Nutritional analysis
- Daily meal planning
- Custom food ranking algorithm

### AI Smart Coach

- Real-time chat using WebSockets
- Groq API (Llama 3.1) integration
- Persistent chat history
- AI-powered fitness assistance

### Media Management

- Exercise image uploads
- Exercise video uploads
- Cloudinary integration

### Background Jobs

- OTP cleanup jobs
- Authentication token cleanup
- Scheduled tasks using Bull and Redis

### API Documentation

- Swagger/OpenAPI documentation
- Interactive API testing

---

## Tech Stack

### Backend

- NestJS
- TypeScript
- Node.js

### Database

- PostgreSQL
- TypeORM

### Authentication & Security

- JWT
- Passport.js
- OTP Verification

### Real-Time Communication

- Socket.IO
- WebSockets

### Infrastructure & Services

- Redis
- Bull Queue
- Cloudinary
- Nodemailer

### External Integrations

- Spoonacular API
- Groq API

---

## My Contributions

As a Backend Developer on the project, I contributed to:

### Account Security

- Implemented the Change Password workflow
- Added old password verification
- Implemented password validation rules
- Added session and token invalidation after password updates

### Email Change Workflow

- Developed a secure two-step email change process
- Implemented OTP generation and verification
- Added email uniqueness validation
- Implemented OTP expiration handling

### Workout Module

- Contributed to the development and enhancement of workout-related features
- Participated in implementing and improving workout management functionality

### Team Collaboration

- Worked within an Agile/Scrum development environment
- Managed tasks and user stories using Jira
- Collaborated through Git and GitHub workflows
- Resolved merge conflicts and integrated team contributions

---

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- PostgreSQL
- Redis
- npm

### Clone the Repository

```bash
git clone https://github.com/mohannadshazli/super-fitness-api-nestjs.git

cd super-fitness-api-nestjs
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Application
PORT=3000

# Database
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

# JWT
JWT_SECRET=
JWT_REFRESH_TOKEN_SECRET=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# External APIs
SPOONACULAR_KEY=
GROQ_API_KEY=

# Email
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASSWORD=
```

### Run the Application

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run build
npm run start:prod
```

### Run Tests

```bash
npm run test
npm run test:e2e
npm run test:cov
```

---

## API Documentation

Once the application is running, Swagger documentation will be available at:

```text
http://localhost:3000/api
```

---

## Repository

GitHub Repository:

https://github.com/mohannadshazli/super-fitness-api-nestjs

---

## Development Workflow

This project was developed using:

- Agile/Scrum methodology
- Jira for sprint planning and task management
- GitHub for version control and collaboration
- Pull Requests and code reviews
- Team-based development workflow

---

## Future Improvements

- Enhanced workout recommendation engine
- More advanced AI coaching capabilities
- Push notifications
- Social and community features
- Advanced analytics and progress tracking
