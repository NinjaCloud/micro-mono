const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8085;
var bodyParser = require('body-parser');

const createClient = require('redis').createClient;

app.use(cors());
app.use(bodyParser.json());

const client = createClient({
  password: 'KtX62uZ6hnUP8ky5G94PsZoGcBnTRzyy',
  socket: {
    host: 'redis-11844.c282.east-us-mz.azure.cloud.redislabs.com',
    port: '11844',
  },
});

client.connect();

app.post('/api/addToCart', async (req, res) => {
  console.log('Add to cart request received', req.body);
  try {
    await client.set(req.body.email, JSON.stringify(req.body.cart)).then((redisValue) => {
      res.send('Cached Successfully');
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post('/api/getCart', async (req, res) => {
  try {
    await client.get(req.body.email).then((redisValue) => {
      console.log('redisValue', redisValue);
      res.send(redisValue);
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.listen(port, () => console.log(`Cart microservice listening on port ${port}!`));
