const express = require('express');
const path = require('path'); // Required for absolute paths

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Parse incoming form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
require('./routes/htmlRoutes')(app);

// Fallback: serve 'index.html' for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
