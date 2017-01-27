
module.exports = {}; 
var exports = module.exports;
exports.deploy = function(){

 var unzip = require('unzip'); var http = require('http'); var request = http.get("http://github.com/ReviveNetwork/ReviveBot/archive/master.zip", function(response) { 
response.pipe(unzip.Extract({path:'./'}))
 });
};
