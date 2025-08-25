# PlantDoc - Plant Disease Detection Frontend

A React-based web application for plant disease detection and expert consultation.

## Features

- 🔐 **Google OAuth Authentication** - Secure login with Google accounts
- 📸 **Image Upload & Analysis** - Upload plant leaf images for disease detection
- 🩺 **Disease Diagnosis** - AI-powered plant disease identification
- 👨‍🌾 **Expert Consultation** - Connect with agricultural experts
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   VITE_DEV_MODE=true
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:5173` to authorized origins
6. Update the `VITE_GOOGLE_CLIENT_ID` in your `.env` file

### Backend Integration

The frontend is designed to work with a backend API. When the backend is not available, the app will use mock data for demonstration purposes.

To enable backend integration:
1. Ensure your backend server is running on port 3000
2. The proxy configuration is already set up in `vite.config.js`
3. Update the `VITE_API_BASE_URL` in your `.env` file if using a different port

## API Endpoints

The frontend expects the following API endpoints:

- `POST /api/auth/google` - Google authentication
- `POST /api/upload` - Image upload and analysis
- `GET /api/experts` - Get list of experts

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **Bootstrap 5** - UI framework
- **React Router** - Client-side routing
- **@react-oauth/google** - Google OAuth integration

## Troubleshooting

### Port 5173 Already in Use

If you get a port error, kill the existing process:
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5173 | xargs kill -9
```

### Backend Connection Issues

If you see proxy errors, the backend server is not running. The app will automatically fall back to mock data for testing purposes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
