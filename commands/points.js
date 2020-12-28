const OverwatchAPI = require('overwatch-api');
const Discord = require("discord.js");

module.exports = {
    name: 'points',
    description: 'Points d\'un joueur',
    args: true,
    usage: '<battletag> <tank | healer | dps>',
    aliases: ['p'],
    execute(message, args) {

        const platform = 'pc';
        const region = 'eu';
        const tag = args[0];

        OverwatchAPI.getProfile(platform, region, tag, (err, json) => {
            if (err) message.channel.send('Erreur de la requête. Assurez-vous que vous ayez bien écrit le battle tag de la sorte: `Pseudo-1234`');
            else {
                var role;
                var points;
                if (args[1] === "tank" || args[1] === "t") {
                    role = "🛡️ Tank";
                    points = json.competitive.tank.rank;
                } else if (args[1] === "dps" || args[1] === "d") {
                    role = "⚔ DPS";
                    points = json.competitive.dps.rank;
                } else if (args[1] === "healer" || args[1] === "h") {
                    role = "💉 Healer";
                    points = json.competitive.support.rank;
                } else {
                    message.react('❌');
                    return message.reply('Erreur args: utiliser tank, healer ou dps');
                }
                //EMBED
                const embed = new Discord.MessageEmbed()
                    .setColor("#545406")
                    .setFooter("Créé avec amour par LemonAdd", "https://i.imgur.com/2B3nSGa.png")
                    .setAuthor("POINTS")
                    .setThumbnail(json.portrait)
                    .addFields(
                        {
                            name: role,
                            value: points
                        }
                    )
                message.channel.send(embed);
                message.react('✅');
            }
        });
    },
};