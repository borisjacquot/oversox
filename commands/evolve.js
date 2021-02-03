const ObjectID = require('mongoose').Types.ObjectId;
const { PointsModel } = require('../models/pointsModel');
const OverwatchAPI = require('overwatch-api');
const Discord = require("discord.js");

module.exports = {
    name: 'evolve',
    description: 'Evolution d\'un joueur',
    args: true,
    usage: '<battletag>',
    aliases: ['evo', 'e'],
    execute(message, args) {
        const platform = 'pc';
        const region = 'eu';
        const btag = args[0];
        let oldd, oldt, oldh, d, t, h, exist;

        message.channel.send(`⌛ Recherche du joueur...`).then((msg)=>{
            OverwatchAPI.getProfile(platform, region, btag, (err, json) => {
                if (err) message.channel.send('Erreur de la requête. Assurez-vous que vous ayez bien écrit le battle tag de la sorte: `Pseudo-1234`');
                else {
                    PointsModel.find({tag: btag}, (err, docs) => {
                        if (docs.length !== 0) {
                            oldd = docs[0].dps;
                            oldt = docs[0].tank;
                            oldh = docs[0].heal;
                            exist = true;
                        }
                        else {
                            oldd = 0;
                            oldt = 0;
                            oldh = 0;
                            exist = false;
                        }

                        d = json.competitive.damage.rank - oldd;
                        t = json.competitive.tank.rank - oldt;
                        h = json.competitive.support.rank - oldh;

                        const embed = new Discord.MessageEmbed()
                            .setColor("#FD0061")
                            .setFooter("Créé avec amour par LemonAdd", "https://i.imgur.com/2B3nSGa.png")
                            .setAuthor("EVOLVE")
                            .setThumbnail(json.portrait)
                            .addFields(
                                {
                                    name: "🛡️ Tank",
                                    value: "    " + json.competitive.tank.rank + " (" + t + ")",
                                    inline: true
                                },
                                {
                                    name: "⚔️ DPS",
                                    value: "    " + json.competitive.damage.rank + " (" + d + ")",
                                    inline: true
                                },
                                {
                                    name: "💉 Healer",
                                    value: "    " + json.competitive.support.rank + " (" + h + ")",
                                    inline: true
                                })

                        if (exist) {
                            const updateRecord = {
                                dps: json.competitive.damage.rank,
                                tank: json.competitive.tank.rank,
                                heal: json.competitive.support.rank
                            };

                            PointsModel.updateOne({tag: btag}, { $set: updateRecord }, (err, docs) => {
                                if (!err) console.log(docs);
                                else console.log('Update error: ' + err);
                            })
                        } else {
                            const newRecord = new PointsModel({
                                tag: btag,
                                dps: json.competitive.damage.rank,
                                tank: json.competitive.tank.rank,
                                heal: json.competitive.support.rank
                            });

                            newRecord.save((err, docs) => {
                                if (!err) console.log(docs);
                                else console.log('Error creating data: ' + err);
                            });
                        }

                        msg.edit("🎉 Joueur trouvé !");
                        msg.edit(embed);
                        message.react('✅');



                    })
                }
            });
        });
    }
}