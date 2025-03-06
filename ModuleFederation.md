# Module Federation in Vite

Vite supports Module Federation through the `@originjs/vite-plugin-federation` plugin, enabling multiple independently built JavaScript applications to share modules and resources. This mechanism makes micro-frontend architecture more feasible, allowing developers to manage and integrate different front-end applications flexibly.

### How to Share Resources in Vite:

1. **Configure Module Federation**:
   Use the `@originjs/vite-plugin-federation` plugin in the Vite configuration file to configure shared modules. Each application needs to declare which modules it exposes and which remote modules it wants to use.

   ```typescript
   // remote-react-app/vite.config.ts (Remote React Application)
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import federation from '@originjs/vite-plugin-federation'

   export default defineConfig({
     plugins: [
       react(),
       federation({
         name: 'remote-react-app',
         filename: 'remoteEntry.js',
         exposes: {
           './CsvViewer': './src/components/CsvViewer.tsx',
         },
         shared: ['react', 'react-dom'],
       }),
     ],
     build: {
       modulePreload: false,
       target: 'esnext',
       minify: false,
       cssCodeSplit: false,
     },
     server: {
       port: 5001,
     },
     preview: {
       port: 5001
     }
   })
   ```

   ```typescript
   // main-app/vite.config.ts (Host Application)
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import federation from '@originjs/vite-plugin-federation'

    export default defineConfig({
    plugins: [
        react(),
        federation({
        name: 'main-app',
        remotes: {
            'remote-angular-app': 'http://localhost:4200/remoteEntry.js',
            'remote-react-app': 'http://localhost:5001/assets/remoteEntry.js',
        },
        shared: ['react', 'react-dom'],
        }),
    ],
    build: {
        modulePreload: false,
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
    },
    server: {
        port: 5000,
        cors: true,
        hmr: {
        clientPort: 5000,
        host: 'localhost',
        },
    },
    })
    ```

2. Using Remote Modules :
In the host application, you can import and use the exposed modules from remote applications directly.
    ```typescript
    // main-app/src/App.tsx
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
        <Suspense fallback={<div>Loading React Component...</div>}>
            <RemoteReactCsvViewer />
        </Suspense>
        <Suspense fallback={<div>Loading Angular Component...</div>}>
            <RemoteAngularCsvViewer />
        </Suspense>
        </div>
    )
    }
    ```

3. Run Multiple Applications :
Ensure that the applications are running on different ports:

- Host Application: localhost:5000
- Remote React App: localhost:5001
- Remote Angular App: localhost:4200

### Key Features and Benefits:
1. Cross-Framework Integration :
   
   - Seamlessly integrate components from different frameworks (React, Angular, etc.)
   - Share state and events between different framework components
2. Build Optimization :
   
   - Shared dependencies to avoid duplicate loading
   - Independent deployment capabilities
   - Optimized build configuration for module federation
3. Development Experience :
   
   - Hot Module Replacement (HMR) support
   - Independent development and testing
   - Flexible component sharing and reuse

This implementation demonstrates how Vite's Module Federation feature enables efficient resource sharing and supports complex micro-frontend architectures while maintaining good development experience and build optimization.
