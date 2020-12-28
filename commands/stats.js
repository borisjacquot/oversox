const OverwatchAPI = require('overwatch-api');
const Discord = require("discord.js");

module.exports = {
    name: 'stats',
    description: 'Stats Overwatch d\'un joueur',
    args: true,
    usage: '<battletag>',
    aliases: ['profile'],
    execute(message, args) {

        const platform = 'pc';
        const region = 'eu';
        const tag = args[0];

        OverwatchAPI.getProfile(platform, region, tag, (err, json) => {
            if (err) message.channel.send('Erreur de la requête. Assurez-vous que vous ayez bien écrit le battle tag de la sorte: `Pseudo-1234`');
            else {
                //EMBED
                const embed = new Discord.MessageEmbed()
                    .setColor("#545406")
                    .setDescription(`Voici les informations de la saison actuelle à propos de [${json.username}](https://playoverwatch.com/fr-fr/career/pc/${args[0]}) !\n\n`)
                    .setFooter("Créé avec amour par LemonAdd", "https://i.imgur.com/2B3nSGa.png")
                    .setAuthor("STATS")
                    .setThumbnail(json.portrait)
                    .addFields(
                        {
                            name: "🎮 Pseudo",
                            value: "    **" + json.username + "**",
                            inline: true
                        },
                        {
                            name: "✨ Level",
                            value: "    **" + json.level + "**",
                            inline: true
                        },
                        {
                            name: "☝️ Recommadations (level " + json.endorsement.level + ")",
                            value: "    🟢 " + json.endorsement.sportsmanship.rate + "%  ---  🟣 " + json.endorsement.teammate.rate + "%  ---  🟠 " + json.endorsement.shotcaller.rate + "%"
                        },
                        {
                            name: ".",
                            value: "."
                        },
                        {
                            name: "🕹️ Parties rapides",
                            value: "    🏆 " + json.games.quickplay.won
                        },
                        {
                            name: "🥇 Parties classées",
                            value: "    🏆 " + json.games.competitive.won + "  ---  ⚖️ " + json.games.competitive.draw + "  ---  💩 " + json.games.competitive.lost + "  ---  📈 " + json.games.competitive.win_rate + "%"
                        },
                        {
                            name: "⌚ Temps de jeu",
                            value: "    🕹️ " + json.playtime.quickplay + "  ---  🥇 " + json.playtime.competitive
                        },
                        {
                            name: ".",
                            value: "."
                        },
                        {
                            name: "🛡️ Tank",
                            value: "    " + json.competitive.tank.rank,
                            inline: true
                        },
                        {
                            name: "⚔️ DPS",
                            value: "    " + json.competitive.damage.rank,
                            inline: true
                        },
                        {
                            name: "💉 Healer",
                            value: "    " + json.competitive.support.rank,
                            inline: true
                        }
                    )
                message.channel.send(embed);
                message.react('✅');

            }
        });
    },
};