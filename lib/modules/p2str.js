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
        if (isNaN(kdr)) kdr = soldier.kdr;
        return "**Name:** " + soldier.nick + '\n**Rank:** ' + soldier.rank + "\n**KDR:** "
            + kdr +
            "\n**Kills per Minute:** " + (soldier.klpm || (parseInt(soldier.kpm)*100) +
            "\n**Deaths per Minute:** " + (soldier.dtpm || (parseInt(soldier.dpm)*100) +
            "\n**Heals:** " + (soldier.heal || soldier.hls) +
            "\n**Revives:** " + (soldier.rviv || soldier.rvs) +
            ((soldier.vmns) ? ("\n**Fallen Victim:** " + soldier.vmns +
                "\n**Bashed:** " + soldier.mvns) : "")
            + "\n**Link:** <" + game + soldier.pid + ">";
    }
    )
};
