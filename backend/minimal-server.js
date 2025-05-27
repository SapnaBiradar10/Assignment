const express = require('express');
const app = express();

// Basic route that responds to all requests
app.get('*', (req, res) => {
  res.send('Server is running');
});

// Start server on the port Render provides
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});