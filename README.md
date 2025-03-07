# Micro Frontend Demo

This project demonstrates a micro frontend architecture with three applications:

1. **Main App (React)** - Host application that displays CSV data from both remote apps in separate tabs
2. **Remote React App** - Remote application built with React that opens and processes CSV files
3. **Remote Angular App** - Remote application built with Angular that opens and processes CSV files

## Project Structure

```
mfe_demo/
├── main-app/            # React host application
├── remote-react-app/    # React remote application
└── remote-angular-app/  # Angular remote application
```

## Features

- Module Federation for micro frontend architecture
- CSV file processing in remote applications
- Data display in the main application
- Tab-based interface for viewing different CSV data

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Running the Applications

You need to start all three applications to see the full demo:

#### 1. Start the Remote React App

```bash
cd remote-react-app
npm install
npm run build  # Important: Build first for Module Federation to work
npm run preview
```

The React remote app will be available at http://localhost:5001

#### 2. Start the Remote Angular App

```bash
cd remote-angular-app
npm install
npm start
```

The Angular remote app will be available at http://localhost:4200

#### 3. Start the Main App

```bash
cd main-app
npm install
npm run dev
```

The main app will be available at http://localhost:5000

## Troubleshooting

If you encounter issues with Module Federation:

1. Make sure all three applications are running
2. Ensure you've built the remote apps before starting them
3. Clear your browser cache or use incognito mode
4. Check the browser console for specific error messages

## Sample Data

For testing purposes, two sample CSV files are provided:

1. `sample-data.csv` - Contains sample user data
2. `sample-products.csv` - Contains sample product data

You can use these files to test the CSV upload functionality in both remote applications.

## How It Works

1. The remote React and Angular apps each provide a CSV file upload component
2. When a CSV file is uploaded in either remote app, the data is processed and made available to the main app
3. The main app displays the CSV data from both remote apps in a tabbed interface
4. The main app directly imports the React component using Module Federation
5. The Angular component is loaded in an iframe, and data is shared via the window object

## Technologies Used

- React with TypeScript
- Angular
- Vite
- Module Federation
- PapaParse for CSV processing

## TODO

- [x] Create project structure
- [x] Set up Main App (React)
- [x] Set up Remote React App
- [x] Set up Remote Angular App
- [x] Implement Module Federation
- [x] Implement CSV file processing
- [x] Implement data display in Main App
