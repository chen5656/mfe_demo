import { lazy, Suspense } from 'react'
import './App.css'
import TabView from './components/TabView.tsx'
import { wrapAngularComponent } from './utils/wrapAngularComponent'

// Lazy load the remote components
const RemoteReactCsvViewer = lazy(() => import('remote-react-app/CsvViewer'));
const RemoteAngularCsvViewer = wrapAngularComponent(() => import('remote-angular-app/CsvViewerComponent'));

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Micro Frontend CSV Demo</h1>
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
            <Suspense fallback={<div>Loading Angular Component...</div>}>
              <RemoteAngularCsvViewer />
            </Suspense>
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