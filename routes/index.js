var path = require('path');
var client = require('../db/index');




var swig = require('swig');
swig.setDefaults({cache: false});

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
//router.use(express.static(__dirname + '/public'));

// router.get('/stylesheets/style.css',function(req,res){
// 	res.sendFile('/stylesheets/style.css');
// });

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', urlencodedParser, function (req, res,next) {
  // var tweets = tweetBank.list();
  // res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );

  client.query('SELECT users.name AS name, tweets.content AS content, tweets.id AS id FROM tweets JOIN users ON users.id = tweets.userid', function (err, result) {
    if (err) 
      //return next(err); // pass errors to Express
      console.log('err was: ',err);
    var tweets = result.rows;
    res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
  });

});

// router.get('/tweets', urlencodedParser, function (req, res) {
//   var tweets = tweetBank.list();
//   res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
// });

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  // var list = tweetBank.find( {name: name} );
  // res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list, showForm:true,defaultName:name } );

  client.query('SELECT users.name AS name, tweets.content AS content, tweets.id AS id FROM tweets JOIN users ON users.id = tweets.userid WHERE users.name=$1', [name], function (err, data) {
    var tweets = data.rows;
    res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: tweets, showForm:true,defaultName:name } );
  });


});

router.get('/tweets/:id', function(req, res) {
  var id = Number(req.params.id);
  var name = req.params.name;
  //var list = tweetBank.find( {id: id} );

  client.query('SELECT users.name AS name, tweets.content AS content, tweets.id AS id FROM tweets JOIN users ON users.id = tweets.userid WHERE tweets.id=$1', [id], function (err, data) {
    var tweets = data.rows;
    res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: tweets, showForm:true,defaultName:name } );
  });

  //res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list,showForm:false } );
});

router.post('/tweets', urlencodedParser, function(req, res) {
  var name = req.body.name;
  var content = req.body.content;
  var tweet = tweetBank.add(name, content);
  console.log("before swig: ");
  
  
  swig.renderFile(path.join(__dirname, '../views/_tweet.html'), {tweet: tweet });
  res.redirect('/');


//we are here
  

});

// function sendTime() {
//     io.emit('newTweet', { name: "Richard", content: "Hello World" , id: 555});
// }

// Send current time every 10 secs
//setInterval(sendTime, 10000);

  //io.sockets.emit('newTweet', { title: 'Twitter.js - Posts by '+name, tweets: list, showForm:true,defaultName:name });

 module.exports = router;