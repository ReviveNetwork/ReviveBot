
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
    const exec = require('child_process').exec; 
    exec("pod list", (error, stdout, stderr) => { 
    	if (error) { 
    		console.error(`exec error: ${error}`); 
    		message.channel.sendCode("shell", '**ERROR** ' + error + '\n' + stderr.toString(), { split: true }); return; 
    		} 
    	console.log(`stdout: ${stdout}`); 
    	message.channel.sendCode("shell", stdout.toString() + { split: true });
    	console.log(`stderr: ${stderr}`); 
    });
}
/**
 * description of the command
 */
const description = "shows bot stats";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
