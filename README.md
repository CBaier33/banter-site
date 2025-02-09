# banter-lang.org

The official website for the banter programming language

---

## Overview

This website is built using a modern tech stack to provide a fast, responsive, and dynamic user experience. The project leverages Angular for the frontend and FastAPI for the backend, along with various tools and technologies to enhance the overall functionality.

---

## Tech Stack

### Frontend: Angular

The frontend of the Banter programming language website is built using **Angular**, a popular framework for building scalable and maintainable web applications. Some of the key technologies and libraries used in the frontend include:

- **Angular**: The core framework for building the app's structure and components.
- **Tailwind CSS**: A utility-first CSS framework used to quickly style the website with a custom design system.
- **Ace Editor**: Integrated as an in-browser IDE for users to interact with the Banter programming language, write code, and see the results directly on the website.
- **TypeScript**: The app is written in TypeScript for strong typing and better maintainability of the codebase.
- **RxJS**: Used for reactive programming and handling asynchronous operations.

#### Key Features in the Frontend:
- **Interactive Code Editor**: The site provides a live coding experience using **Ace Editor**, allowing users to write and test Banter code.
- **Responsive Design**: With Tailwind CSS, the site ensures responsiveness across all devices, providing an optimal experience for both mobile and desktop users.

---

### Backend: FastAPI

The backend of the Banter website is powered by **FastAPI**, a modern web framework for building APIs with Python. It is designed to be fast and efficient, allowing the site to handle high-performance operations, such as processing Banter code and interacting with the frontend.

#### Backend Features:
- **Banter Language Interpreter**: The core functionality of the site relies on a custom **Banter interpreter**, written in Python, that executes Banter code submitted by the frontend.
- **API Endpoints**: FastAPI serves various RESTful endpoints, including code evaluation, documentation retrieval, and other dynamic content.
- **JWT Authentication**: The backend utilizes **JWT (JSON Web Tokens)** for secure user authentication when logging into the site or submitting Banter code for evaluation.
- **CORS (Cross-Origin Resource Sharing)**: CORS is configured to allow frontend requests from different origins during development and production.

---

### Docker

The entire website is containerized using **Docker**. The project includes two main containers:

1. **Frontend (Angular)**: The Angular application is served using a Docker container, ensuring that it can be run consistently across all environments.
2. **Backend (FastAPI)**: The FastAPI application is also containerized in its own Docker container, making it easy to deploy and scale.

#### Docker Setup:
- **Docker Compose** is used to orchestrate the containers, allowing both the frontend and backend services to be started together, while ensuring they can communicate with each other.
- The **backend** service listens on port `8000`, while the **frontend** service listens on port `4200` (Angular's default port).

---

### Deployment

The Banter website is deployed using **Caddy** as the web server. Caddy automatically handles HTTPS, provides easy configuration for reverse proxies, and simplifies the setup of secure environments.

- The **Caddyfile** configuration includes a reverse proxy setup, routing traffic to the frontend and backend services.
- The website is deployed on a **Ubuntu** server, running Docker and the Caddy web server.

---

## Local Development

To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/banter-lang/banter-site.git
   cd banter-site
   ```

2. **Install dependencies for the frontend**:
   ```bash
   cd client
   npm install
   npm run build
   ```

3. **Start the project using Docker Compose**:
   ```bash
   docker-compose up --build
   ```

4. Access the frontend at `http://localhost:4200` and the API at `http://localhost:8000`.

---

## Contributing

Contributions to the Banter website are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Push your branch and open a pull request.

---
