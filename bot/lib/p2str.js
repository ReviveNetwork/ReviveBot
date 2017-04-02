const revive = require('revive-stats.js');
module.exports = function (soldier, game) {
    console.log("working p2str")
    let gameob = (game === "bf2142" ? revive.bf2142 : revive.bf2);
    let lnk = '';
    return gameob.getPlayer(soldier.pid).then(soldier => {
        if (game == 'bf2')
        { lnk = 'https://battlelog.co/bfhq.php?pid=' }
        else
        { lnk = 'https://bl2142.co/bfhq.php?pid=' }
        console.log("working p2str")
        return "**Name:** " + soldier.nick + '\n**Rank:** ' + soldier.rank + "\n**KDR:** "
            + soldier.kdr +
            "\n**Kills per Minute:** " + soldier.killsPM +
            "\n**Deaths per Minute:** " + soldier.deathsPM +
            "\n**Heals:** " + soldier.heals +
            "\n**Revives:** " + soldier.revives +
            "\n**Kill Streak:** " + soldier.bestKillStreak +
            "\n**Death Streak:** " + soldier.worstDeathStreak +
            "\n**Favourite Vehicle:** " + revive.constants[game].vehicles[soldier.favVehicle] +
            "\n**Favourite Kit:** " + revive.constants[game].kits[soldier.favKit] +
            ((soldier.topOpponentName) ? ("\n**Top Opponent:** " + soldier.topOpponentName +
                "\n**Top Victim:** " + soldier.topVictimName) : "")
            + "\n**Link:** <" + lnk + soldier.pid + ">";
    }
    )
};
