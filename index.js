const express = require('express');
const bodyParser = require('body-parser');

const { router: publicRoutes } = require('./routes/general');
const authRoutes = require('./routes/auth_users');

const app = express();
app.use(bodyParser.json());

app.use('/', publicRoutes);
app.use('/', authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});