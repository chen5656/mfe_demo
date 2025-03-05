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


6. Configure the Module Federation for each application.
    Update the vite.config.ts for remote react app
    Update the vite.config.ts for main app

?? what to do with angular

7. Work on each app.
    Main app: add TabViewer.
    Remote react app: add CsvViewer
    Remote Angular app: 
        cd ../remote-angular-app && ng generate component csv-viewer
        Update csv-viewer.component.html, csv-viewer.component.ts and csv-viewer.component.scss
        Update 
        
