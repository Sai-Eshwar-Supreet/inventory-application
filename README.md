# Inventory Application

A robust web application for comprehensive game inventory management, developed with **Node.js**, **Express**, **EJS**, and **PostgreSQL**.

This application enables users to catalog games with detailed metadata including genres and developers, manage multiple releases per game across various editions, platforms, publishers, and regions, and perform efficient searches. It implements full CRUD operations, robust server-side validation, and scalable data persistence.

## Live Demo

[View Live Demo](https://inventory-application-9ul1.onrender.com)

## Features

- **Game Management**: Create, read, update, and delete games with associated genres and developers
- **Release Tracking**: Manage detailed game releases with edition, platform, publisher, region, release date, pricing, and cover images
- **Reference Data Administration**: Maintain catalogs for genres, developers, platforms, publishers, regions, and editions
- **Advanced Search**: Query releases with flexible search functionality
- **Server-Side Rendering**: Dynamic content delivery using EJS templating
- **Data Validation**: Comprehensive server-side validation using express-validator
- **Database Integration**: Persistent storage with PostgreSQL and optimized queries

## Tech Stack

- **Backend**: Node.js, Express.js
- **Validation**: express-validator
- **Frontend**: EJS (Embedded JavaScript Templates)
- **Database**: PostgreSQL
- **Architecture**: MVC pattern with repository layer

## Local Development Setup

```bash
git clone https://github.com/Sai-Eshwar-Supreet/inventory-application.git
cd inventory-application
npm install
npm run db:init
npm run dev
```

The application will be accessible at: http://localhost:8080

## Environment Configuration

Create a `.env` file in the project root with the following variables:

```
PORT=8080
DB_CONNECTION_STRING=<your_connection_string>
```

## Project Architecture

```
.
├── controllers/          # Request handlers and business logic
├── db/                   # Database layer
│   ├── populateDB/       # Database initialization scripts
│   └── [entity]/         # Entity-specific repositories and queries
├── middlewares/          # Custom middleware (validation, etc.)
├── public/               # Static assets (CSS, JS, images)
├── routes/               # Route definitions and mounting
└── views/                # EJS templates and partials
```

## Notes

- Persistent storage with PostgreSQL
- No authentication required
- Server-side validation implemented

## Context

- Built while learning backend development with [The Odin Project](https://www.theodinproject.com/).
