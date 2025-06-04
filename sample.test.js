const express = require('express');
const app = express();

const unusedVar = 42; // This will trigger a warning due to no-unused-vars

app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = app; // Export for testing
app.listen(3000, () => console.log('Server running on port 3000'));