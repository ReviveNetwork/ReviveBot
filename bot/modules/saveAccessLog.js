const access_log = require('./../commands').access_log;
const fs = require('fs');
const path = require('path');

setInterval(() => {
    fs.writeFile(
        path.resolve(__dirname, '..', '..', 'access_log.json'),
         JSON.stringify(access_log), 
         'utf8'
         , err=>consolde.log);
}, 60000)