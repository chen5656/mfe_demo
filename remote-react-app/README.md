# Remote React App

This is a remote application for the micro frontend demo. It provides a CSV file upload component that processes CSV files and makes the data available to the main application.

## Features

- CSV file upload and processing
- Data sharing with the main application via Module Federation
- Preview of CSV data

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
# Important: Build first for Module Federation to work
npm run build

# Then start the dev server
npm run dev
```

The application will be available at http://localhost:5001

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

- This application exposes a CsvViewer component via Module Federation
- The component is consumed by the main application
- Data is shared with the main application via the window object
- For Module Federation to work correctly, you must build the app before starting the dev server