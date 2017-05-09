
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
async function command(params, message) {
	const exec = require('child_process').exec;
	exec("pm2 status", (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			message.channel.send('**ERROR** ' + error + '\n' + stderr, { split: true, code: 'shell' }); return;
		}
		console.log(`stdout: ${stdout}`);
		message.channel.send(stdout, { split: true, code: 'shell' });
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
