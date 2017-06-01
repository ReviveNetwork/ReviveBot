const settings = require('./../../settings.json');
const request = require('request-promise-native');
/**
 * This method should return the response directly to the channel
 * @param {*string array} params 
 * @param {*message} message
 */
const exec = require('child_process').exec;
async function command(params, message) {
    if (settings.owners.includes(message.author.id)) {
        const ms = await message.channel.send("Executing: " + params.join(' '), { code: 'xl' });
        const shell = exec(params.join(' '), async function () {
            await postGist();
            updateMessage();
        });
        let outputlines = [];
        let errorlines = [];
        let gist;
        const updateMessage = function () {
            let out = outputlines.slice(-5);
            let err = errorlines.slice(-5);
            let res = 'Command:\n```xl\n' + params.join(' ') + '```\n'
                + 'Output:\n ```xl\n' + out.join('\n') + '```\n'
                + ((err.length > 0) ? ('Error:\n ```xl\n' + err.join('\n') + '```\n') : "")
                + ((gist) ? ('Gist: <' + gist + ">") : "");
            //console.log(res);
            ms.edit(res);
        }
        const postGist = async function () {
            let content = '### Command:  \n```xl\n' + params.join(' ') + '\n```  \n'
                + '### Output:  \n ```xl\n' + outputlines.join('\n') + '\n```  \n'
                + ((errorlines.length > 0) ? ('### Error:  \n ```xl\n' + errorlines.join('\n') + '\n```  \n') : "");
            const body = {
                "description": params.join(' '),
                "public": true,
                "files": {
                    "output.md": {
                        "content": content
                    }
                }
            };
            gist = await request({
                method: "POST",
                body: JSON.stringify(body),
                uri: "https://api.github.com/gists",
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'ReviveBot'
                }
            });
            gist = JSON.parse(gist);
            gist = gist.html_url;
        }
        shell.stdout.on('data', function (data) {
            if (data.toString() === "" || data.toString() === "") return;
            outputlines.push(data.toString());
            updateMessage();
        });
        shell.stderr.on('data', function (data) {
            if (data.toString() === "" || data.toString() === "") return;
            errorlines.push(data.toString());
            updateMessage();
        });
        shell.on('exit', async function (code) {
            outputlines.push("Exited with code: " + code);
        });
    }
    else
        message.reply('Not worthy')
}
/**
 * description of the command
 */
const description = "executes a command (owners only)";
/**
 * Define Exports
 */
module.exports = {
    execute: command,
    description: description
};
