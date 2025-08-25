# Backend Setup Instructions

## Error: Backend Connection Failed

If you're seeing connection errors like:
```
❌ Backend connection failed for /api/health: connect ECONNREFUSED ::1:8080
💡 Make sure your backend server is running on http://localhost:8080
```

This means the frontend is trying to connect to a backend server that isn't running.

## Solution

1. **Start your backend server** on port 3000:
   ```bash
   # Navigate to your backend directory
   cd /path/to/your/backend
   
   # Start the server (example commands)
   npm start
   # or
   node server.js
   # or
   python app.py
   # or
   java -jar your-backend.jar
   ```

2. **Verify the backend is running**:
   - Open http://localhost:8080 in your browser
   - You should see your backend API response or documentation

3. **Check the backend endpoints**:
   The frontend expects these endpoints to be available:
   - `GET /api/health` - Health check endpoint
   - `POST /api/upload` - Image upload and analysis
   - `GET /api/experts` - Get list of experts
   - `POST /api/auth/google` - Google authentication

## Backend Requirements

Your backend server should:
- Run on `http://localhost:8080`
- Accept CORS requests from `http://localhost:5173`
- Handle multipart/form-data for file uploads
- Return JSON responses
- Support the following endpoints:
  - `GET /api/health` - Health check
  - `POST /api/upload` - Image upload with multipart/form-data
  - `GET /api/experts` - Get experts list
  - `POST /api/auth/google` - Google authentication

## Example Backend Health Check

Your backend should respond to `GET /api/health` with:
```json
{
  "status": "ok",
  "message": "Backend server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Troubleshooting

1. **Port already in use**: Make sure no other service is using port 8080
2. **CORS issues**: Configure your backend to allow requests from localhost:5173
3. **Firewall**: Ensure your firewall allows connections on port 8080
4. **Different port**: If your backend runs on a different port, update the `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:YOUR_PORT
   ```

## Common Issues and Solutions

### "Failed to process image: null" Error
This error typically occurs when:
1. The backend `/api/upload` endpoint returns null or empty response
2. The backend is not properly handling multipart/form-data
3. The backend is not running or not accessible

**Solutions:**
1. Ensure your backend properly handles file uploads with `multipart/form-data`
2. Check that the backend returns a valid JSON response
3. Verify the backend is running on port 8080
4. Check backend logs for any processing errors

### Authentication Issues
If Google authentication fails:
1. Verify the backend `/api/auth/google` endpoint is implemented
2. Check CORS configuration allows authentication requests
3. Ensure proper Google OAuth configuration on backend

### Experts API Issues
If experts data doesn't load:
1. Verify the backend `/api/experts` endpoint returns valid JSON
2. Check the endpoint is accessible and returns proper data structure