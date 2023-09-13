const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8081;

const orders = require('./data/orders.json').orders;

app.use(cors());

app.get('/api/orders', (req, res) => res.json(orders));

app.get('/api/orders/:id', (req, res) => res.json(orders.find((order) => order.id === req.params.id)));

app.listen(port, () => console.log(`Orders microservice listening on port ${port}!`));
