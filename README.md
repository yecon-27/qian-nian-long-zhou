# Millennium Dragon Boat Creative Rebirth - Dragon Boat Team Voting System

**Language**: [English](./README.md) | [中文](./README.cn.md)

A full-stack mobile dragon boat team voting system built with SpringBoot + Vue 3, featuring real-time voting, leaderboards, and comprehensive admin panel. Built on RuoYi framework with front-end and back-end separation architecture.

![3bec9fbeec3cd8fbd514d2db3699f8c](https://github.com/user-attachments/assets/c576c689-01f5-4cf4-b7da-ca6ea25a901f)

## Technology Stack

**Frontend**: Vue 3 + TypeScript + Pinia + Vite + Element Plus  
**Backend**: Spring Boot + RuoYi Framework + Spring Security + MyBatis Plus  
**Database**: MySQL + Redis

## Features

- Daily voting limits with real-time vote counting
- Dynamic leaderboard based on vote counts
- Team detail pages with real-time view tracking
- Search functionality for teams and authors
- Mobile-first responsive design
- Complete admin management system
- Anonymous user access support

## Screenshots

<img src="https://github.com/user-attachments/assets/1289c5e5-f77f-49b0-84a8-8cd3a9fbe542" width ="200"> <img src="https://github.com/user-attachments/assets/2a0e9c27-a7d2-4f7f-a428-c84bd08fb66b" width ="200"> <img src="https://github.com/user-attachments/assets/c3df6fe7-4d02-4312-9a1b-0bba9b16a97c" width ="200"> <img src="https://github.com/user-attachments/assets/981add77-4450-4afa-843c-96b9149eeb19" width ="200">

## Quick Start

### Requirements

- Java 8+, Node.js 16+, MySQL 5.7+, Redis 6+, Maven 3.6+

### Installation

1. **Clone the project**

   ```bash
   git clone https://github.com/your-username/qian-nian-long-zhou.git
   cd qian-nian-long-zhou
   ```

2. **Database setup**

   - Import SQL files from `sql/` and `backend-sql/` directories
   - Configure `ruoyi-admin/src/main/resources/application-druid.yml`

3. **Start services**

   ```bash
   # Backend service
   ./ry.sh  # Linux/Mac or ry.bat (Windows)

   # Admin frontend (http://localhost:80)
   cd ruoyi-ui && npm install && npm run dev

   # Main frontend (http://localhost:5173)
   cd qian-nian-long-zhou && npm install && npm run dev
   ```

**Default admin**: admin / admin123

## Project Structure

For detailed project structure documentation, see: [Project Structure](./docs/project-structure.md)

## Documentation

- [Installation Guide](./docs/installation.md) - Detailed setup instructions
- [Features](./docs/features.md) - Complete feature overview
- [Deployment Guide](./docs/deployment.md) - Production deployment
- [Project Structure](./docs/project-structure.md) - Code organization

## Contributing

Issues and Pull Requests are welcome to improve the project.

## License

This project is licensed under the [MIT License](LICENSE).

