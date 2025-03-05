const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'remote-angular-app',
  exposes: {
    './CsvViewerComponent': './src/app/csv-viewer/csv-viewer.component.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  // Removed invalid devServer configuration
});