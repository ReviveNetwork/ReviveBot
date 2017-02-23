const revive = require('revive-stats.js');
module.exports = function (soldier, game) {
    console.log("working p2str")
    let gameob = (game === "bf2142" ? revive.bf2142 : revive.bf2);
    return gameob.getPlayer(soldier.pid).then(soldier => {
        if (game == 'bf2')
        { game = 'https://battlelog.co/bfhq.php?pid=' }
        else
        { game = 'https://bl2142.co/bfhq.php?pid=' }
        console.log("working p2str")
        let kdr = (parseInt(soldier.kill) / parseInt(soldier.deth));
        if (isNaN(kdr)) kdr = parseFloat(soldier.kdr)*100;
	 kdr = kdr.toFixed(2);
        return "**Name:** " + soldier.nick + '\n**Rank:** ' + soldier.rank + "\n**KDR:** "
            + kdr +
            "\n**Kills per Minute:** " + parseFloat(soldier.klpm || (parseFloat(soldier.kpm)*100)).toFixed(2) +
            "\n**Deaths per Minute:** " + parseFloat(soldier.dtpm || (parseFloat(soldier.dpm)*100)).toFixed(2) +
            "\n**Heals:** " + (soldier.heal || soldier.hls) +
            "\n**Revives:** " + (soldier.rviv || soldier.rvs) +
            ((soldier.vmns) ? ("\n**Fallen Victim:** " + soldier.vmns +
                "\n**Bashed:** " + soldier.mvns) : "")
            + "\n**Link:** <" + game + soldier.pid + ">";
    }
    )
};
