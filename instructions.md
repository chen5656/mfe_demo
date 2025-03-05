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