const request = require('request').defaults({
  headers: {
    'User-Agent': 'GameSpyHTTP/1.0'
  }
});

const rp = (options) => new Promise((resolve, reject) => request(options, (err, res, body) => {
  if (err) {
    reject(err);
  } else {
    resolve(body);
  }
}));

module.exports = rp;
