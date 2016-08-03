var pg = require('pg');



var postgresUrl = 'postgres://localhost/twitterdb';
var client = new pg.Client(postgresUrl);


//connect to our database
client.connect(function (err) {
  if (err) throw err;

  // execute a query on our database
  client.query('SELECT * FROM tweets LIMIT 10', [], function (err, result) {
    if (err) throw err;

    // just print the result to the console
    console.log(result.rows[0]); // outputs: { name: 'brianc' }

    // disconnect the client
    // client.end(function (err) {
    //   if (err) throw err;
    // });
  });
});

module.exports = client;