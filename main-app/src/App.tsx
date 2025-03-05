import { lazy, Suspense } from 'react'
import './App.css'
import TabView from './components/TabView'

// Lazy load the remote components
const RemoteReactCsvViewer = lazy(() => import('remote-react-app/CsvViewer'));
// Angular component will be accessed through window object

function App() {
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
            <Suspense fallback={<div>Loading React Component...</div>}>
              <RemoteReactCsvViewer />
            </Suspense>
          </div>
          
          <div className="remote-app angular-app">
            <h2>Angular Remote App</h2>
            <p>The Angular app is loaded in an iframe below:</p>
            <iframe 
              src="http://localhost:4200" 
              title="Angular Remote App"
              width="100%"
              height="300px"
              style={{ border: '1px solid #ccc', borderRadius: '4px' }}
            />
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