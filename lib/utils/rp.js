const request = require('request');
request.defaults({
  headers: {
    'User-Agent': 'GameSpyHTTP/1.0'
  }
});

const rp = (options) => new Promise((resolve, reject) => request(options, (err, res, body) => {
  if (err) {
    reject(err);
    console.log(err)
  } else {
    console.log(body);
    resolve(body);
  }
}));

module.exports = rp;
