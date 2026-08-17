# Plasma Drive

<p align="center">
  <strong>A modern home-appliance repair service booking platform built with React, Appwrite, and Vite.</strong>
</p>

<p align="center">
  <a href="https://plasma-drive.vercel.app/">Live Demo</a>
  ·
  <a href="https://github.com/prasanta-dev/plasma-drive">Source Code</a>
</p>

---

## Overview

**Plasma Drive** is a responsive web application designed for an electrical and home-appliance repair service business.

Customers can explore repair services, select services through a cart-based flow, and submit booking requests. The application also includes authenticated management functionality for service-related data.

This project demonstrates practical frontend engineering together with a backend-as-a-service architecture using **React + Appwrite**, with production deployment on **Vercel**.

## Live Application

**Production:** https://plasma-drive.vercel.app/

## Key Features

### Customer Experience
- Responsive home page for an appliance repair business
- Browse repair services and appliance categories
- Service details and service selection
- Cart-based service booking flow
- User registration and login
- Persistent authentication/session handling
- Responsive navigation and UI
- Appliance imagery and brand presentation

### Application Management
- Authenticated application areas
- Service and business data management
- Appwrite database integration
- Appwrite Storage integration
- Centralized authentication state
- Route-based application structure
- Authentication/session error handling

### UI & Experience
- Responsive desktop and mobile design
- Tailwind CSS styling
- Framer Motion animations
- Swiper interactive sections
- React Icons
- Reusable React components
- Component-based architecture

## Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 19 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| State Management | Redux Toolkit + React Redux |
| Routing | React Router |
| Backend / BaaS | Appwrite |
| Authentication | Appwrite Auth |
| Database | Appwrite Database |
| File Storage | Appwrite Storage |
| Animation | Framer Motion |
| Icons | React Icons |
| Carousel / Slider | Swiper |
| Code Quality | ESLint |
| Deployment | Vercel |
| Version Control | Git + GitHub |

## Architecture

```text
                         ┌──────────────────────┐
                         │       Browser        │
                         │   React Application  │
                         └──────────┬───────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
                 ▼                  ▼                  ▼
          React Router       Redux Toolkit       UI Components
                 │                  │                  │
                 └──────────────────┼──────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       Appwrite       │
                         │                      │
                         │  Authentication      │
                         │  Database            │
                         │  Storage             │
                         └──────────────────────┘
                                    ▲
                                    │
                         ┌──────────┴───────────┐
                         │       Vercel         │
                         │   Production Hosting │
                         └──────────────────────┘
```

## Project Structure

```text
plasma-drive/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── redux/
│   │   └── features/
│   ├── services/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Authentication & State Management

The application uses **Appwrite Authentication** for user sessions.

When the application starts, it checks the current Appwrite session and updates the Redux authentication state accordingly. Redux Toolkit provides centralized client-side state management for authentication and shared application data.

## Appwrite Integration

Appwrite is used as the backend-as-a-service layer for authentication, database operations, and file storage.

Required environment variables:

```env
VITE_APPWRITE_ENDPOINT=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_PROJECT_NAME=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_BUCKET_ID=
VITE_APPWRITE_SERVICES_COLLECTION_ID=
VITE_APPWRITE_TABLES_ID=
```

> Never commit your `.env` file or private credentials to GitHub.

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- An Appwrite project

### Installation

```bash
git clone https://github.com/prasanta-dev/plasma-drive.git
cd plasma-drive
npm install
```

### Environment Configuration

Create a `.env` file in the project root:

```env
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_PROJECT_NAME=your_project_name
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_APPWRITE_SERVICES_COLLECTION_ID=your_services_collection_id
VITE_APPWRITE_TABLES_ID=your_tables_id
```

Configure the corresponding Appwrite authentication, database, storage bucket, collections/tables, and Web platform.

### Run Locally

```bash
npm run dev
```

The development server normally runs at:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

## Deployment

The production application is deployed on **Vercel**.

```text
GitHub
   │
   ▼
Vercel
   │
   ├── npm install
   ├── npm run build
   └── deploy dist/
            │
            ▼
      Live Application
```

### Vercel Configuration

| Setting | Value |
|---|---|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

The required `VITE_APPWRITE_*` environment variables are configured in Vercel.

The production Vercel hostname is also configured as a Web platform in Appwrite so browser requests from the deployed application are accepted.

## What I Learned

Building Plasma Drive provided practical experience with a complete application workflow rather than isolated UI components.

### Frontend Engineering
- Building reusable React components
- Managing shared state with Redux Toolkit
- Client-side routing with React Router
- Responsive layouts with Tailwind CSS
- Authentication-aware UI flows
- Loading and error handling
- Animation and interactive UI integration

### Backend Integration
- Connecting a React frontend to Appwrite
- Authentication and session handling
- Database integration
- File storage integration
- Environment-based configuration
- Appwrite Web platform and permission configuration

### Deployment & Workflow
- Git and GitHub repository management
- Remote and branch synchronization
- Production builds with Vite
- Vercel deployment
- Production environment variables
- Debugging production/browser issues
- Testing a real deployed application

## Engineering Highlights

- Component-based React architecture
- Centralized state management
- Service-layer separation for Appwrite operations
- Environment-based configuration
- Production deployment with Vercel
- Responsive UI implementation
- Authentication-aware application flow
- Real backend service integration instead of static-only mock data

## Screenshots

Recommended portfolio screenshots can be stored in:

```text
public/screenshots/
├── 01-home.png
├── 02-services.png
├── 03-service-details.png
├── 04-login.png
├── 05-register.png
├── 06-dashboard.png
├── 07-cart.png
├── 08-booking.png
├── 09-confirmation.png
├── 10-admin.png
├── 11-service-management.png
├── 12-data.png
├── 13-mobile.png
├── 14-appwrite.png
├── 15-vercel.png
└── 16-overview.png
```

Once those images are in the repository, they can be displayed here to make the project page more visual for recruiters.

## Future Improvements

- Online payment integration
- Booking status notifications
- Email/SMS booking confirmation
- Advanced admin analytics
- Customer booking history
- Search and filtering improvements
- Expanded role-based access control
- Automated testing
- Performance optimization and code splitting
- Improved image optimization

## Author

**Prasanta Debnath**

Aspiring Full-Stack Web Developer

- GitHub: https://github.com/prasanta-dev
- Project: https://github.com/prasanta-dev/plasma-drive
- Live Demo: https://plasma-drive.vercel.app/

---

<p align="center">
  Built with React, Appwrite, Tailwind CSS, Redux Toolkit, Vite, and Vercel.
</p>
