import { useState, useEffect, lazy, Suspense } from 'react'
import React from 'react'
import './App.css'
import TabView from './components/TabView'

// Error Boundary component
class ErrorFallback extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Something went wrong loading the remote component.</h2>
          <p>Error: {this.state.error?.message || 'Unknown error'}</p>
          <button onClick={() => this.setState({ hasError: false })}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy load the remote components with error handling
const ReactCsvViewer = lazy(() => {
  return import('remote-react-app/CsvViewer')
    .catch(err => {
      console.error('Failed to load React remote component:', err);
      return { default: () => (
        <div className="error-message">
          Failed to load React remote component. Make sure the remote app is running on port 5001.
        </div>
      )};
    });
});

function App() {
  const [isAngularAppLoaded, setIsAngularAppLoaded] = useState(false);

  // Check if Angular app is accessible
  useEffect(() => {
    const checkAngularApp = async () => {
      try {
        const response = await fetch('http://localhost:4200', { mode: 'no-cors' });
        setIsAngularAppLoaded(true);
      } catch (error) {
        console.error('Failed to check Angular app:', error);
        setIsAngularAppLoaded(false);
      }
    };

    checkAngularApp();
    const interval = setInterval(checkAngularApp, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>Micro Frontend CSV Demo</h1>
        <p>This demo shows how to use Module Federation to integrate React and Angular applications</p>
      </header>

      <div className="app-content">
        <div className="remote-apps">
          <div className="remote-app react-app">
            <h2>React Remote App</h2>
            <ErrorFallback>
              <Suspense fallback={<div>Loading React Component...</div>}>
                <ReactCsvViewer />
              </Suspense>
            </ErrorFallback>
          </div>
          
          <div className="remote-app angular-app">
            <h2>Angular Remote App</h2>
            <p>The Angular app is loaded in an iframe below:</p>
            {isAngularAppLoaded ? (
              <iframe 
                src="http://localhost:4200" 
                title="Angular Remote App"
                width="100%"
                height="300px"
                style={{ border: '1px solid #ccc', borderRadius: '4px' }}
              />
            ) : (
              <div className="error-message">
                Failed to load Angular remote app. Make sure it's running on port 4200.
              </div>
            )}
          </div>
        </div>

        <div className="main-app-display">
          <h2>Main App Display</h2>
          <TabView />
        </div>
      </div>

      <footer>
        <p>Micro Frontend Demo - Module Federation Example</p>
      </footer>
    </div>
  )
}

export default App