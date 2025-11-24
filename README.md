# MENjs3drive - Cloud Storage Application

A full-stack cloud storage application built with MongoDB, Express.js, and Node.js (MEN Stack), integrated with Supabase for file storage. This application allows users to register, login, and upload files to the cloud with secure authentication.

## 🚀 Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **File Upload**: Upload files to Supabase storage with sanitized filenames
- **Secure Routes**: Protected routes using authentication middleware
- **Database Integration**: MongoDB for user and file metadata storage
- **Cloud Storage**: Supabase for reliable file storage with public URLs
- **Responsive UI**: Clean interface built with Tailwind CSS and Flowbite

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file handling

**Storage:**
- Supabase Storage

**Frontend:**
- EJS templating engine
- Tailwind CSS
- Flowbite UI components
- Remix Icon

## 📁 Project Structure

```
MENjs3drive/
├── config/
│   ├── db.js                    # MongoDB connection
│   ├── firebase.config.js       # Firebase configuration (legacy)
│   └── multer.config.js         # Multer file upload configuration
├── files/                       # Local file storage directory
├── middlewares/
│   └── auth.js                  # JWT authentication middleware
├── models/
│   ├── files.models.js          # File schema
│   └── user.model.js            # User schema
├── routes/
│   ├── index.routes.js          # Main routes (home, upload)
│   ├── upload.js                # Upload API routes
│   └── user.routes.js           # User routes (register, login)
├── supabase/
│   ├── download.js              # Supabase download utility
│   ├── getPublicUrl.js          # Get public URL utility
│   ├── listFiles.js             # List files utility
│   └── upload.js                # Supabase upload utility
├── views/
│   ├── home.ejs                 # Home page with file upload
│   ├── index.ejs                # Landing page
│   ├── login.ejs                # Login page
│   └── register.ejs             # Registration page
├── .env                         # Environment variables
├── .gitignore
├── app.js                       # Alternative server entry
├── index.js                     # Main server entry point
├── supabase.js                  # Supabase client configuration
└── package.json
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/MENjs3drive.git
   cd MENjs3drive
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DB_URL=mongodb://localhost:27017/men-drive
   JWT_SECRET=your_jwt_secret_key
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_service_role_key
   PORT=3000
   ```

4. **Set up MongoDB:**
   Make sure MongoDB is installed and running on your system.

5. **Set up Supabase:**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Create a storage bucket named `MENjs3drive`
   - Make the bucket public or configure appropriate policies
   - Copy your project URL and service role key to `.env`

6. **Create required directories:**
   ```bash
   mkdir files
   ```

## Usage

1. **Start the server:**
   ```bash
   node index.js
   ```
   The server will run on `http://localhost:3000`

2. **Register a new user:**
   Navigate to `/user/register` and create an account

3. **Login:**
   Navigate to `/user/login` and sign in with your credentials

4. **Upload files:**
   After logging in, you'll be redirected to the home page where you can upload files

## API Endpoints

### User Routes
- `GET /user/register` - Registration page
- `POST /user/register` - Create new user
- `GET /user/login` - Login page
- `POST /user/login` - Authenticate user

### File Routes
- `GET /` - Home page (requires authentication)
- `POST /upload` - Upload file to Supabase (requires authentication)
- `POST /api/upload` - Alternative upload endpoint

## Authentication

The application uses JWT tokens stored in HTTP-only cookies for authentication. Protected routes use the `auth` middleware to verify tokens before granting access.

## File Upload Process

1. User selects a file through the web interface
2. File is uploaded using Multer (stored in memory)
3. Filename is sanitized to remove special characters
4. File is uploaded to Supabase storage
5. File metadata (path, Supabase URL, original name) is saved to MongoDB
6. Public URL is returned to the user

## 🛡 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token authentication
- HTTP-only cookies
- Input validation with express-validator
- Filename sanitization
- Protected routes

## 📦 Models

### User Model
```javascript
{
  name: String (required, unique, min 3 chars),
  email: String (required, unique, lowercase),
  password: String (required, hashed, min 5 chars)
}
```

### File Model
```javascript
{
  path: String (required),
  originalname: String (required),
  userId: ObjectId (ref: 'users', required)
}
```

## 📚 Dependencies

Main dependencies include:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `multer` - File upload handling
- `@supabase/supabase-js` - Supabase client
- `express-validator` - Input validation
- `cookie-parser` - Cookie parsing
- `ejs` - Template engine
- `dotenv` - Environment variables

## 📝 Notes

- The Firebase configuration files are legacy and not currently in use
- Files are temporarily stored locally before being uploaded to Supabase
- The application supports both `app.js` and `index.js` as entry points

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 💙 Acknowledgments

- Supabase for cloud storage
- MongoDB for database
- Tailwind CSS for styling
- Flowbite for UI components
