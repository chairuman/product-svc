require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes');
const swaggerDocument = require('../docs/swagger.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// eslint-disable-next-line
app.listen(port, () => console.log(`Server running on port ${port}`));
