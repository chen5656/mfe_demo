# Main App (React)

This is the host application for the micro frontend demo. It displays CSV data from both remote apps in a tabbed interface.

## Features

- Consumes remote components from React and Angular applications
- Displays CSV data in a tabbed interface
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

The application will be available at http://localhost:5000

### Building for Production

```bash
npm run build
```

## Dependencies

- React
- TypeScript
- Vite
- Module Federation
- PapaParse for CSV processing

## Notes

- Make sure both remote applications are running before starting this application
- The React remote app should be running on port 5001
- The Angular remote app should be running on port 4200

## Troubleshooting

If you encounter issues with Module Federation:

1. Make sure both remote applications are built and running
2. The remote React app must be built with `npm run build` before starting it with `npm run dev`
3. The remote Angular app must be built with `npm run build` before starting it with `npm start`
4. Clear your browser cache or use incognito mode
5. Check the browser console for specific error messages
6. If you see CORS errors, make sure all applications have proper CORS headers configured