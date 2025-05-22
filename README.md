# Rate My Bite

https://assignment9-flax.vercel.app

## 🍔 Overview

Rate My Bite API is the backend service for a platform where users can discover, post, and review street food spots. The API handles user authentication, food post management, premium subscriptions, voting, commenting, and admin operations.

## ✨ Features

- **Authentication System**
  - User registration and login
  - JWT-based authentication
  - Password hashing and security

- **Food Post Management**
  - Create, read, update, and delete food posts
  - Post approval workflow
  - Premium content management

- **User Roles & Permissions**
  - Normal users
  - Premium subscribers
  - Admin users with moderation capabilities

- **Subscription System**
  - Payment gateway integration (ShurjoPay)
  - Premium content access management
  - Subscription status tracking

- **Interaction Features**
  - Voting system (upvote/downvote)
  - Commenting and rating system
  - Content moderation

- **Search & Filtering**
  - Search by title, category
  - Filter by price range, popularity, rating

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Payment**: ShurjoPay
- **Validation**: Zod

## 📋 Prerequisites

- Node.js (v16+)
- PostgreSQL
- npm or yarn

## Getting Started

Follow these steps to set up and run the project locally.

## 1. Clone the Repository

```bash
git clone https://github.com/skrehad/Rate-My-Bite-Server
```

## 2. Install Dependencies

Navigate to the project directory and install the necessary dependencies:

   ```bash
   cd Rate-My-Bite-Server
   npm install
   ```

## 3. Set Up Environment Variables
Create a .env file in the project's root to store environment variables, such as MongoDB URI or secret keys. 


## 4. Run the Project
- **Development Mode**
To start the project in development mode with hot reloading:
```bash
npm run dev
```
- **Production Mode**
If you prefer to run the project in production mode:
```bash
npm run build
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

If you have any questions or feedback, please reach out to [your-email@example.com](mailto:your-email@example.com).
