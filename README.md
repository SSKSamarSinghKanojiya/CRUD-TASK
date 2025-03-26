Task Title: Create a Simple RESTful API for Managing Tasks

Requirements:
1. Tech Stack:
●	Node.js with Express.js for the API.
●	MongoDB or PostgreSQL as the database.
●	bcryptjs for password hashing.
●	jsonwebtoken for token generation and verification.
2. Features:
User Authentication:
1.	Register a User:
○	Endpoint: POST /auth/register
○	Fields:
■	username (required, unique)
■	email (required, unique, valid format)
■	password (required, minimum 6 characters)
■	image (using multer)
○	Hash the password using bcryptjs before saving it to the database.
2.	Login a User:
○	Endpoint: POST /auth/login
○	Fields:
■	email
■	password
○	Validate the user's credentials.
○	Generate a JWT upon successful login and return it in the response.
3.	Token Validation:
○	Protect task-related endpoints (CRUD operations) by verifying the JWT in the Authorization header (Bearer <token>).
Task Management (Protected):
1.	Create a Task:
○	Endpoint: POST /tasks
○	Fields:
■	title
■	description (optional)
■	completed (default: false)
○	The task should be associated with the logged-in user's ID.
2.	Retrieve All Tasks for Logged-in User:
○	Endpoint: GET /tasks
○	Only return tasks belonging to the logged-in user.
3.	Retrieve a Single Task by ID:
○	Endpoint: GET /tasks/:id
○	Ensure the task belongs to the logged-in user.
4.	Update a Task by ID:
○	Endpoint: PUT /tasks/:id
○	Ensure the task belongs to the logged-in user.
5.	Delete a Task by ID:
○	Endpoint: DELETE /tasks/:id
○	Ensure the task belongs to the logged-in user.
________________________________________
3. Database Models:
User Model:
●	username: String, required, unique.
●	email: String, required, unique.
●	password: String, required (hashed).
●	image: String
Task Model:
●	title: String, required, max 100 characters.
●	description: String (optional).
●	completed: Boolean, default false.
●	userId: ObjectId (references the logged-in user).
●	createdAt: Timestamp (auto-generated).
●	updatedAt: Timestamp (auto-updated).
________________________________________
Endpoints Summary:
Authentication:
●	POST /auth/register - Register a new user.
●	POST /auth/login - Login and receive a JWT.
Task Management (Protected with JWT):
●	POST /tasks - Create a new task.
●	GET /tasks - Retrieve all tasks for the logged-in user.
●	GET /tasks/:id - Retrieve a specific task by ID (if it belongs to the logged-in user).
●	PUT /tasks/:id - Update a specific task by ID.
●	DELETE /tasks/:id - Delete a specific task by ID.
________________________________________
Implementation Notes:
1.	Password Hashing:
○	Use bcryptjs to hash passwords during user registration.
○	Compare the hashed password during login.
2.	JWT Token:
○	Generate a JWT with a secret key during login.
○	Set an expiration time for the token (e.g., 1 hour).
○	Verify the token in middleware before allowing access to protected routes.
3.	Middleware:
○	Create an authMiddleware to verify the JWT and extract the user ID.
○	Use this middleware for all task-related routes.
4.	Error Handling:
○	Return proper status codes (e.g., 401 for unauthorized, 403 for forbidden, etc.).
○	Provide meaningful error messages.
________________________________________
