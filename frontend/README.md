## Environment Variables

For local development:

- Create a `.env` file in the frontend directory with:
  ```
  VITE_REACT_APP_BACKEND_BASEURL=http://localhost:3000
  ```

For production deployment:

- Add the following environment variable in the Vercel dashboard under your project settings:
  ```
  VITE_REACT_APP_BACKEND_BASEURL=https://backend-fawn-kappa.vercel.app
  ```
- Note: Vercel manages environment variables through its dashboard, not through .env files
