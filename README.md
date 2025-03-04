# Restaurant Website

This project is a full-stack restaurant website built with **Next.js**, **Prisma**, **PostgreSQL**, **NextAuth**, **Tailwind CSS**, and deployed on **Vercel**. It allows users to browse the menu, register, log in, add items to a cart, and complete the checkout process.

## Features

- **User Authentication**: Users can register, log in, and securely manage their sessions using **NextAuth** with **Credentials Provider** and **bcrypt** for password hashing.
- **Menu System**: Users can browse the restaurant's menu and select items.
- **Shopping Cart**: Selected menu items are added to a cart, which users can view and modify.
- **Responsive Design**: Fully responsive layout built with **Tailwind CSS**.
- **Admin Privileges** (planned feature): Admin users will have additional functionality to manage the restaurant's menu and view orders (this can be expanded in the future).
- **Session Management**: User session data is managed using JWTs and **NextAuth**.
- **Database Integration**: Utilizes **PostgreSQL** for storing user and menu data, accessed using **Prisma** ORM.

## Tech Stack

- **Frontend**: 
  - **Next.js** (React framework for building the UI and server-side rendering)
  - **Tailwind CSS** (Utility-first CSS framework for styling)
  - **React** (JavaScript library for building the user interface)
  
- **Backend**: 
  - **NextAuth** (For authentication and session management)
  - **Prisma ORM** (For interacting with the **PostgreSQL** database)
  - **bcrypt.js** (For password hashing)

- **Database**:
  - **PostgreSQL** (Relational database for storing user, order, and menu data)

- **Deployment**:
  - **Vercel** (For easy deployment and continuous integration with GitHub)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/restaurant-website.git
