const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the dist directory
app.use(express.static('dist'));

// For any other route, serve index.html (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 