const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8083;
const sql = require('mssql');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.post('/api/register', (req, res) => {
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
      request.query(
        `insert into 
        monolith.store.Users (email, password) values ('${req.body.email}', '${req.body.password}')`,
        (err, result) => {
          if (err) console.log(err);
          console.log(result);
          res.send(result);
        }
      );
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.listen(port, () => console.log(`Register microservice listening on port ${port}!`));
