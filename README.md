# Byte Influencer

Byte Influencer is a professional-grade influencer marketing management platform designed for agencies and brands to discover, track, and manage content creators across multiple social media ecosystems. By unifying real-time analytics from Instagram, YouTube, TikTok, and Facebook into a single intuitive dashboard, the platform streamlines the campaign management process and provides actionable data-driven insights.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Express](https://img.shields.io/badge/Express-JS-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5.0-5833EE?style=for-the-badge&logo=daisyui&logoColor=white)
![RapidAPI](https://img.shields.io/badge/RapidAPI-005BBB?style=for-the-badge&logo=rapidapi&logoColor=white)

## Overview

In the modern digital landscape, managing influencer relationships often involves juggling multiple platforms and fragmented data. Byte Influencer solves this by providing a centralized command center. It allows users to import creator profiles directly via URLs, automatically fetching key metrics like engagement rates, follower growth, and average interactions. Beyond discovery, it offers a robust client management system to track brand partnerships, campaign budgets, and performance statistics in one unified interface.

## Key Features

- Multi-Platform Integration: Direct data import from Instagram, YouTube, TikTok, and Facebook via specialized API services.
- Real-Time Analytics: Automated calculation of engagement rates and performance metrics upon profile import.
- Centralized Dashboard: Unified view of all content creators with smart filtering by platform, niche, and status.
- Campaign Management: Full CRUD functionality for client brand partnerships, including budget tracking and ROI monitoring.
- Smart Search: Debounced search functionality for efficient navigation through large creator and client databases.
- Premium UI/UX: Modern design featuring glassmorphism effects, scroll-triggered animations, and responsive layouts.
- Data Integrity: Robust handle normalization and duplicate prevention to maintain a clean database.

## Tech Stack

### Frontend
- React 19: Leveraging modern React patterns for a fast and reactive user interface.
- Vite: Optimized build tool for rapid development and high-performance production bundles.
- Tailwind CSS v4: Utility-first styling for a highly customizable and modern visual design.
- DaisyUI: Professional component library for consistent UI elements like modals and buttons.
- Framer Motion: Powering smooth transitions and sophisticated micro-animations.
- Axios: Reliable HTTP client for seamless communication with the backend API.

### Backend
- Express.js: Scalable RESTful API architecture for high-performance data handling.
- Node.js: Efficient JavaScript runtime for the server environment.
- MongoDB: NoSQL database for flexible and scalable data storage.
- Mongoose: Elegant object modeling for MongoDB schemas.

### External APIs
- YouTube Data API v3: Fetching channel stats and video performance metrics.
- RapidAPI (Instagram, TikTok, Facebook): Real-time data scraping and statistics for cross-platform analytics.

## Project Structure

```text
Byte Influencer/
├── Byte-Influencer-Client/          # Frontend React Application
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── influencers/         # Creator management components
│   │   │   ├── clients/             # Brand management components
│   │   │   └── modals/              # Interactive dialogs
│   │   ├── pages/                   # Main route views
│   │   ├── services/                # API communication layer
│   │   └── routes/                  # Client-side routing configuration
├── Byte-Influencer-Server/          # Backend Express API
│   ├── controllers/                 # Business logic handlers
│   ├── models/                      # MongoDB schema definitions
│   ├── routes/                      # API endpoint definitions
│   ├── services/                    # External API integrations
│   └── config/                      # Database and environment config
```

## Installation

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB account or local instance
- API Keys for YouTube Data API and RapidAPI

### 1. Clone the Repository
```bash
git clone https://github.com/EsteakAhamed/Byte-Influencer.git
cd Byte-Influencer
```

### 2. Backend Setup
```bash
cd Byte-Influencer-Server
npm install
```
Create a `.env` file in the `Byte-Influencer-Server` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
YOUTUBE_API_KEY=your_youtube_api_key
RAPIDAPI_KEY=your_rapidapi_key
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../Byte-Influencer-Client
npm install
```
Create a `.env` file in the `Byte-Influencer-Client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the application:
```bash
npm run dev
```

## Contributing

Contributions are welcome and appreciated!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---
