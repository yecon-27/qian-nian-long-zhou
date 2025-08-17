🌐 语言切换 | Language Switch: [中文](./README.cn.md) | [English](./README.md) 
# Millennium Dragon Boat Creative Rebirth - Dragon Boat Team Voting System

## Project Overview

This is a full-stack mobile dragon boat team voting system based on SpringBoot + Vue 3, where users can vote for different dragon boat teams and view real-time rankings. The project adopts a front-end and back-end separation architecture, with the backend built on the RuoYi framework, providing complete user management, permission control, and data persistence functionality.

![3bec9fbeec3cd8fbd514d2db3699f8c](https://github.com/user-attachments/assets/c576c689-01f5-4cf4-b7da-ca6ea25a901f)

## Technology Stack

### Frontend Technologies
- **Vue 3** - Using Composition API
- **TypeScript** - Type safety
- **Pinia** - State management
- **Vue Router** - Route management
- **Vite** - Build tool
- **Element Plus / Vant** - UI component library

### Backend Technologies
- **Spring Boot** - Backend framework
- **RuoYi Framework** - Rapid development platform
- **Spring Security** - Security framework
- **MyBatis Plus** - ORM framework
- **MySQL** - Database
- **Redis** - Cache

## Project Progress

- `7.14-7.16` - **Frontend Development** - Vue 3 frontend application
- `7.24` - **Frontend Deployment** - Vercel deployment configuration completed
- `7.24` - **SQL Database Tables** - 4 main tables generated
- `7.25-7.28` - **Backend Deployment** - Backend API interface deployment configuration completed
- `7.28-8.1` - **Full-stack Integration** - Frontend and backend interface integration completed
- `Future` - **Cloud Server Deployment** - Frontend and backend deployment to cloud servers

## Core Features

- **Voting System** - Daily voting limits with real-time vote count updates
- **Leaderboard** - Real-time ranking display based on vote counts
- **Detail Pages** - Team information and statistics (real-time view count updates) display
- **Search Functionality** - Support for team name and author search
- **Responsive Design** - Mobile and desktop adaptation
- **Admin Backend** - Complete management system based on RuoYi framework
- **Anonymous Users** - Can view leaderboards and rules without login
- **Extensibility** - Image information can be updated and replaced

<img src="https://github.com/user-attachments/assets/1289c5e5-f77f-49b0-84a8-8cd3a9fbe542" width ="200"><img src="https://github.com/user-attachments/assets/2a0e9c27-a7d2-4f7f-a428-c84bd08fb66b" width ="200"><img src="https://github.com/user-attachments/assets/c3df6fe7-4d02-4312-9a1b-0bba9b16a97c" width ="200"><img src="https://github.com/user-attachments/assets/981add77-4450-4afa-843c-96b9149eeb19" width ="200">

## 🚀 Quick Start

### Environment Requirements

- **Java**: JDK 8 or higher
- **Node.js**: 16.x or higher
- **MySQL**: 5.7 or higher
- **Redis**: 6.x or higher
- **Maven**: 3.6 or higher

### 1. Database Configuration

1. Database tables:
![Database Tables](https://github.com/user-attachments/assets/b6da8314-b96f-4db2-88b2-fd9626c4de78)

### 2. Backend Startup (Spring Boot + RuoYi Framework)

1. **Configure database connection**

```bash
# Edit configuration file
ruoyi-admin/src/main/resources/application-druid.yml
```

2. **Start backend service**

```bash
# Method 1: Run using IDE
# Run ruoyi-admin/src/main/java/com/ruoyi/RuoYiApplication.java

# Method 2: Use Maven commands
mvn clean install
cd ruoyi-admin
mvn spring-boot:run
```

Backend service will start at `http://localhost:8080`

### 3. RuoYi Management Frontend Startup

```bash
# Enter RuoYi frontend directory
cd ruoyi-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

RuoYi management system will start at `http://localhost:80`

**Default admin account**:
- Username: `admin`
- Password: `admin123`

### 4. Main Frontend Application Startup

```bash
# Enter main frontend directory
cd qian-nian-long-zhou

# Install dependencies
npm install

# Start development server
npm run dev
```

Main frontend application will start at `http://localhost:5173`

### 5. Production Environment Build

```bash
# Build backend
mvn clean package

# Build RuoYi frontend
cd ruoyi-ui
npm run build:prod

# Build main frontend
cd qian-nian-long-zhou
npm run build
```

## 📁 Project Structure

```
Millennium-Dragon-Boat-Project/
├── .gitignore                    # Git ignore file
├── LICENSE                       # Open source license
├── README.md                     # Project documentation
├── pom.xml                       # Maven main configuration file
├── ry.bat                        # Backend startup script (Windows)
├── ry.sh                         # Backend startup script (Linux/Mac)
├── backend-sql                   # MySQL database tables
├── bin/                          # Batch script directory
│   ├── clean.bat                 # Clean script
│   ├── package.bat               # Package script
│   └── run.bat                   # Run script
├── doc/                          # Documentation directory
│   └── 若依环境使用手册.docx      # RuoYi framework manual
├── sql/                          # Database scripts
│   ├── ry_20250522.sql           # RuoYi base data
│   ├── longzhou_team.sql         # Dragon boat team table
│   ├── longzhou_vote.sql         # Voting record table
│   └── quartz.sql                # Scheduled task table
├── qian-nian-long-zhou/          # Main frontend application (Vue 3)
│   ├── src/
│   │   ├── api/                  # API interface layer
│   │   ├── assets/               # Static resources
│   │   ├── components/           # Common components
│   │   ├── composables/          # Composable functions
│   │   ├── directives/           # Custom directives
│   │   ├── router/               # Route configuration
│   │   ├── stores/               # State management (Pinia)
│   │   ├── utils/                # Utility functions
│   │   └── views/                # Page components
│   ├── docs/                     # Project documentation
│   ├── public/                   # Public resources
│   ├── package.json              # Dependency configuration
│   ├── vite.config.ts            # Vite configuration
│   └── vercel.json               # Vercel deployment configuration
├── ruoyi-ui/                     # RuoYi management frontend (Vue 2)
│   ├── src/
│   │   ├── api/                  # API interfaces
│   │   ├── assets/               # Static resources
│   │   ├── components/           # Components
│   │   ├── directive/            # Directives
│   │   ├── layout/               # Layout
│   │   ├── router/               # Routes
│   │   ├── store/                # Vuex state management
│   │   ├── utils/                # Utility classes
│   │   └── views/                # Pages
│   ├── bin/                      # Batch scripts
│   │   ├── build.bat             # Build script
│   │   ├── package.bat           # Package script
│   │   └── run-web.bat           # Startup script
│   ├── package.json              # Dependency configuration
│   └── vue.config.js             # Vue CLI configuration
├── ruoyi-admin/                  # Backend main module
│   ├── src/main/java/com/ruoyi/  # Java source code
│   ├── src/main/resources/       # Configuration files
│   └── pom.xml                   # Maven configuration
├── ruoyi-common/                 # Common module
├── ruoyi-framework/              # Framework module
├── ruoyi-generator/              # Code generation module
├── ruoyi-quartz/                 # Scheduled task module
└── ruoyi-system/                 # System module
```

## 🔧 Development Tool Scripts

### Windows Batch Scripts
- `ry.bat` - One-click backend service startup
- `bin/clean.bat` - Clean compiled files
- `bin/package.bat` - Package project
- `bin/run.bat` - Run project
- `ruoyi-ui/bin/run-web.bat` - Start RuoYi frontend
- `ruoyi-ui/bin/build.bat` - Build RuoYi frontend

### Recommended Startup Sequence
1. **Start database services** (MySQL, Redis)
2. **Start backend service**: `ry.bat`
3. **Start RuoYi management frontend**: `cd ruoyi-ui && npm run dev`
4. **Start main frontend application**: `cd qian-nian-long-zhou && npm run dev`

For detailed technical implementation and development guides, please refer to the [complete documentation](./qian-nian-long-zhou/docs/README.md).

---

***Last Updated***: August 17, 2025

---
