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
        return "**Name:** " + soldier.nick + '\n**Rank:** ' + soldier.rank + "\n**KDR:** "
            + soldier.kdr +
            "\n**Kills per Minute:** " + soldier.killsPM +
            "\n**Deaths per Minute:** " + soldier.deathsPM +
            "\n**Heals:** " + soldier.heals +
            "\n**Revives:** " + soldier.revives +
            "\n**Favourite Vehicle:** " + soldier.favVehicle +
            "\n**Favourite Kit:** " + soldier.favKit +
            ((soldier.topOpponentName) ? ("\n**Top Opponent:** " + soldier.topOpponentName +
                "\n**Top Victim:** " + soldier.topVictimName) : "")
            + "\n**Link:** <" + game + soldier.pid + ">";
    }
    )
};
