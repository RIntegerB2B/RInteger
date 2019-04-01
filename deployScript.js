var request = require('request');
request('http://52.66.167.224:3020/rinteger', function (error, response, body) {
  console.log('error:', error);
  console.log('body:', body);
});
