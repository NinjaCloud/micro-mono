const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8084;
const sql = require('mssql');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  try {
    const config = {
      user: 'dbadmin',
      password: 'E7S0O4Ifh1x',
      server: 'hpe-server.database.windows.net',
      database: 'monolith',
    };
    sql.connect(config, (err) => {
      if (err) console.log(err);
      const request = new sql.Request();
      request.query(`select * from monolith.store.Users where email ='${req.body.email}'`, (err, result) => {
        if (err) console.log(err);

        if (result.recordset.length === 0) {
          res.send({ error: 'User not found' });
        }
        if (result.recordset[0].password !== req.body.password) {
          res.send({ error: 'Incorrect password' });
        } else {
          token = generateToken(result.recordset[0]);
          result.recordset[0].token = token;
          res.send(result.recordset[0]);
        }
      });
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// create function to generate JWT token
const jwt = require('jsonwebtoken');
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    'secret',
    { expiresIn: '30d' }
  );
};

app.listen(port, () => console.log(`Login microservice listening on port ${port}!`));
