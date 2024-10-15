// Import 'path' module for handling file paths
const path = require('path');

// Export function to set up routes
module.exports = (app) => 
  // Serve 'index.html' for the root URL
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
