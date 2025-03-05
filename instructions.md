1. Create main react app
cd main-app && npm create vite@latest . -- --template react-ts
npm install

2. Create remote react app
cd ../remote-react-app && npm create vite@latest . -- --template react-ts
npm install

3. Create remote angular app
cd .. && ng new remote-angular-app --routing=true --style=scss --skip-git

4. Set up Module Federation for our micro frontend architecture. 
cd main-app && npm install @originjs/vite-plugin-federation
cd ../remote-react-app && npm install @originjs/vite-plugin-federation
cd ../remote-angular-app && npm install @angular-architects/module-federation

5. Add some additional dependencies for CSV file handling in all three applications:
cd ../main-app && npm install papaparse @types/papaparse
cd ../remote-react-app && npm install papaparse @types/papaparse
cd ../remote-angular-app && npm install papaparse @types/papaparse


6. Work on each app.
    Main app: add TabViewer.
    Remote react app: add CsvViewer
    Remote Angular app: 
        cd ../remote-angular-app && ng generate component csv-viewer
        Update csv-viewer.component.html, csv-viewer.component.ts and csv-viewer.component.scss
        Update 

7. Configure the Module Federation for each application.
    Update the vite.config.ts for remote react app
    Update the vite.config.ts for main app
    cd ../remote-angular-app && ng add @angular-architects/module-federation --project remote-angular-app --port 4200
    (using webpack this time)
    Configure the webpack.config.js file for the Angular app to expose our CSV viewer component:

8. fix the linter errors by installing the necessary type definitions:
cd ../remote-react-app && npm install -D @types/node
cd ../main-app && npm install -D @types/node


9. To run the demo:
To get the micro frontend demo working properly, please follow these steps:
For the Remote React App:
   cd remote-react-app
   npm install
   npm run build  # Important: Build first
   npm run preview # 
For the Remote Angular App:
   cd remote-angular-app
   npm install
   npm start
For the Main App:
   cd main-app
   npm install
   npm run dev

Notes:
1. The federation plugin generates the remoteEntry.js file during the build process, not in development mode.
2. To access this file, you need to:
   - First build your application
   - Then serve the built files
   Then, serve the built files (you can use vite preview or any static file server):

```bash
npm run preview
```