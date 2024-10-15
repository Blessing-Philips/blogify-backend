# Blogify Backend

## Project Description
**Blogify Backend** is a robust backend system designed for a blog engine, providing features like user authentication, blog post creation, commenting, and post categorization. This platform offers a secure and efficient environment where users can register, create posts, and interact with content through comments.

Built with **Node.js**, **Express**, and **MongoDB**, the project ensures scalability, security, and seamless user experiences.

## Features
- **User Authentication**: Secure user registration and login using hashed passwords (bcryptjs).
- **Post Creation**: Users can create, edit, and delete blog posts.
- **Commenting**: Users can comment on blog posts and engage with the content.
- **Post Categorization**: Posts can be categorized for easier navigation and content discovery.
- **Error Handling**: Proper error handling for smooth user experience and debugging.
  
## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)

### Setup Instructions
1. Clone the repository:
    ```bash
    git clone https://github.com/Blessing-Philips/blogify-backend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd blogify-backend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. The backend will run on `http://localhost:2006`.

## API Endpoints

### Authentication
- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/login`: User login

### Blog Posts
- `POST /api/posts`: Create a new blog post (authenticated)
- `GET /api/posts`: Get all blog posts
- `GET /api/posts/:id`: Get a single blog post by ID
- `PUT /api/posts/:id`: Edit a blog post (authenticated)
- `DELETE /api/posts/:id`: Delete a blog post (authenticated)

### Comments
- `POST /api/posts/:id/comments`: Add a comment to a blog post
- `GET /api/posts/:id/comments`: Get comments for a specific post

## Testing
You can use **Postman** or any other API testing tool to interact with the API. Example requests are provided in the `postman_collection.json` file in the project.

## Technologies Used
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework.
- **MongoDB**: NoSQL database for storing user data, posts, and comments.
- **bcryptjs**: Password hashing for secure user authentication.
- **JWT**: JSON Web Token for secure user sessions.

## Contribution
Feel free to submit issues and pull requests! Contributions are welcome.