const Discord = require("discord.js");
const osu = require("node-osu");
const moment = require("moment");
const config = require("./config.json");
const fs = require("fs-extra");
const move_decimal = require("move-decimal-point");

const client = new Discord.Client();
const osuApi = new osu.Api(config.apiKey);

client.login(config.token);

client.on("ready", () => {
  console.log(`[${moment().format("HH:mm:ss")}] Touch fluffy tail =w=`);
  client.user.setGame("with fire");
});

client.on("message", (message) => {
  //Ignorē ziņu, ja nesākas ar prefixu vai arī ja ziņas autors ir bots.
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  //Ignorē ziņu, ja tās autors nav jurrrgis vai waywern2012

  const prefix = config.prefix;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  if (command === "hello") {
    let author = 
    message.guild.member(message.author).addRole("361256307044646924").catch(console.error);
    return;
  }

  if (message.author.id !== config.ownerID) {
    if (message.author.id !== config.waywernID) {
      return;
    }
  }

  if (command === "check") {
    message.channel.send("Ah shit, here we go again... NotLikeThis");
    function check() {
      let osulink = fs.readJsonSync("./osulink.json");
      console.log(`[${moment().format("HH:mm:ss")}] Sāku pārbaudīt scorus...`);
      console.log(`[${moment().format("HH:mm:ss")}] Šī pārbaude aizņems aptuveni ${Math.round(osulink.length * 20 / 60)} minūtes!`);
      for (let i in osulink) {
        setTimeout(function() {
        osuApi.getUser({u: osulink[i].osu_id})
        .then(user => {
          let LVRank = parseInt(user.pp.countryRank);
          console.log(`[${moment().format("HH:mm:ss")}] ${user.name} - #${LVRank} LV`);
          console.log(`[${moment().format("HH:mm:ss")}] Pašlaik pārbaudu ${user.name} scorus...`);
           if (LVRank === 1) {
             message.guild.member(osulink[i].discord_id).addRole("202057149860282378").catch(console.error);
             setTimeout(() => {
             message.guild.member(osulink[i].discord_id).removeRoles(["202061474213003265", "202061507037495296", "202061546787045377", "202061582006485002", "202061613644251136", "297854952435351552", "348195423841943564"]).catch(console.error);
             }, 2000);
           }
           else if (LVRank > 1 && LVRank <= 5) {
             message.guild.member(osulink[i].discord_id).addRole("202061474213003265").catch(console.error);
             setTimeout(() => {
             message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061507037495296", "202061546787045377", "202061582006485002", "202061613644251136", "297854952435351552", "348195423841943564"]).catch(console.error);
             }, 2000);
           }
           else if (LVRank > 5 && LVRank <= 10) {
             message.guild.member(osulink[i].discord_id).addRole("202061507037495296").catch(console.error);
             setTimeout(() => {
             message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061474213003265", "202061546787045377", "202061582006485002", "202061613644251136", "297854952435351552", "348195423841943564"]).catch(console.error);
             }, 2000);
           }
           else if (LVRank > 10 && LVRank <= 25) {
             message.guild.member(osulink[i].discord_id).addRole("202061546787045377").catch(console.error);
             setTimeout(() => {
             message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061474213003265", "202061507037495296", "202061582006485002", "202061613644251136", "297854952435351552", "348195423841943564"]).catch(console.error);
             }, 2000);
           }
           else if (LVRank > 25 && LVRank <= 50) {
             message.guild.member(osulink[i].discord_id).addRole("202061582006485002").catch(console.error);
             setTimeout(() => {
             message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061474213003265", "202061507037495296", "202061546787045377", "202061613644251136", "297854952435351552", "348195423841943564"]).catch(console.error);
             }, 2000);
           }
           else if (LVRank > 50 && LVRank <= 100) {
             message.guild.member(osulink[i].discord_id).addRole("202061613644251136").catch(console.error);
             setTimeout(() => {
             message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061474213003265", "202061507037495296", "202061546787045377", "202061582006485002", "297854952435351552", "348195423841943564"]).catch(console.error);
             }, 2000);
           }
           else if (LVRank > 100) {
             message.guild.member(osulink[i].discord_id).addRole("297854952435351552").catch(console.error);
             setTimeout(() => {
             message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061474213003265", "202061507037495296", "202061546787045377", "202061582006485002", "202061613644251136", "348195423841943564"]).catch(console.error);
             }, 2000);
           }
           else {
             console.log("dunno");
           }
          osuApi.getUserBest({u: osulink[i].osu_id, limit: 25})
          .then(scores => {
            for (let q in scores) {
              let time = scores[q].raw_date;
              let editedTime = moment(time).subtract(5, "h").format("YYYY-MM-DD HH:mm:ss");
              let diff = moment().diff(editedTime);
              let z = parseInt(q);
              if (diff <= 3600000) {
                osuApi.getBeatmaps({b: scores[q].beatmapId})
                .then(beatmaps => {
                  let minutes = Math.floor(beatmaps[0].time.total / 60);
                  let seconds = beatmaps[0].time.total - minutes * 60;
                  let muhdiff = Math.round(beatmaps[0].difficulty.rating * 100) / 100;
      
                  let tris = parseInt(scores[q].counts["300"]);
                  let simts = parseInt(scores[q].counts["100"]);
                  let piecdesmit = parseInt(scores[q].counts["50"]);
                  let miss = parseInt(scores[q].counts.miss);
                  let points = (piecdesmit * 50) + (simts * 100) + (tris * 300);
                  let hits = miss + piecdesmit + simts + tris;
                  let formula = points / (hits * 300);
                  let round = Math.round(formula * 10000) / 10000;
                  let accuracy = move_decimal(round, "2");

                  let pp = Math.round(scores[q].pp * 100) / 100;
                  let totalpp = Math.round(user.pp.raw * 100) / 100;

                  let min = Math.floor(diff / 60000);
                  let sec = ((diff % 60000) / 1000).toFixed(0);

                  let mods = scores[q].mods.join("");
                  const channel = message.guild.channels.find("name", "botspam");
                    
                  if (scores[q].mods[0] === undefined) {
                    channel.send(new Discord.RichEmbed()
                    .setAuthor(user.name, `https://a.ppy.sh/${user.id}`, `https://osu.ppy.sh/u/${user.id}`)
                    .setThumbnail(`https://b.ppy.sh/thumb/${beatmaps[0].beatmapSetId}l.jpg`)
                    .setDescription(`__**${pp}pp |** #${z + 1} personal best__\n #${parseInt(user.pp.rank).toLocaleString()} **|** #${user.pp.countryRank} ${user.country} **|** ${totalpp.toLocaleString()}pp\n x${scores[q].maxCombo}/${beatmaps[0].maxCombo} **|** ${scores[q].rank} **|** ${parseInt(scores[q].score).toLocaleString()} **|** ${accuracy}% **|** nomod\n [${beatmaps[0].artist} - ${beatmaps[0].title} [${beatmaps[0].version}]](https://osu.ppy.sh/b/${scores[q].beatmapId})\n ${minutes}:${seconds} **|** ${beatmaps[0].bpm} BPM **|** ★**${muhdiff}**`)
                    .setFooter(`Pirms ${min} minūtēm un ${sec} sekundēm`)
                    ).catch(console.error);
                    }
                  else {
                    channel.send(new Discord.RichEmbed()
                    .setAuthor(user.name, `https://a.ppy.sh/${user.id}`, `https://osu.ppy.sh/u/${user.id}`)
                    .setThumbnail(`https://b.ppy.sh/thumb/${beatmaps[0].beatmapSetId}l.jpg`)
                    .setDescription(`__**${pp}pp |** #${z + 1} personal best__\n #${parseInt(user.pp.rank).toLocaleString()} **|** #${user.pp.countryRank} ${user.country} **|** ${totalpp.toLocaleString()}pp\n x${scores[q].maxCombo}/${beatmaps[0].maxCombo} **|** ${scores[q].rank} **|** ${parseInt(scores[q].score).toLocaleString()} **|** ${accuracy}% **|** ${mods}\n [${beatmaps[0].artist} - ${beatmaps[0].title} [${beatmaps[0].version}]](https://osu.ppy.sh/b/${scores[q].beatmapId})\n ${minutes}:${seconds} **|** ${beatmaps[0].bpm} BPM **|** ★**${muhdiff}**`)
                    .setFooter(`Pirms ${min} minūtēm un ${sec} sekundēm`)
                    ).catch(console.error);
                  }
                })
                .catch(console.error);
              }
            }
          })
          .catch(console.error);
        })
        .catch(console.error);
      }, i * 20000);
      }
    }
    setInterval(check, 3600000);
    check();
    return;
  }
  if (command === "desa") {
    return message.channel.send("Man garšo desa!");
  }
  if (command === "link") {
    let [discord_user, osu_id, note] = message.content.split(/\s+/g).slice(1);
    let discord_id = discord_user.replace(/\D/g,'');
    console.log(discord_id);
    fs.readFile("./osulink.json", function (err, data) {
      let json = JSON.parse(data);
      json.push({discord_id: discord_id, osu_id: osu_id, note: note});
      fs.writeFile("./osulink.json", JSON.stringify(json, null, 2));
    })
    message.channel.send("Lietotājs pievienots datubāzei!")
    console.log(`[${moment().format("HH:mm:ss")}] ${message.author.username} pievienoja jaunu lietotāju: discord_id - ${discord_id} osu_id -  ${osu_id} note - ${note}`);
    return;
  }
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
  function evilAngel() {
    try {
      let position = newMember.hoistRole.comparePositionTo(oldMember.hoistRole);
      if (position === 0) {
        return;
      }
      if (position > 0 && oldMember.hoistRole.name === "Restricted") {
        const channel = newMember.guild.channels.find("name", "botspam");
        //const channel = newMember.guild.channels.find("name", "playground");
        console.log(`[${moment().format("HH:mm:ss")}] ${newMember.user.username} tika unrestricots! :)`)
        channel.send(new Discord.RichEmbed()
        .setAuthor(newMember.user.username, newMember.user.avatarURL)
        .setDescription("tika unrestricots! :)")
        .setColor("#14d121")
        ).catch(console.error);
        return;
      }
      if (position > 0 && newMember.hoistRole.name === "#1 LV") {
        const channel = newMember.guild.channels.find("name", "botspam");
        //const channel = newMember.guild.channels.find("name", "playground");
        console.log(`[${moment().format("HH:mm:ss")}] ${newMember.user.username} pakāpās uz ${newMember.hoistRole.name} grupu!`);
        channel.send(new Discord.RichEmbed()
        .setAuthor(newMember.user.username, newMember.user.avatarURL)
        .setDescription(`pakāpās uz **${newMember.hoistRole.name}** grupu!`)
        .setColor("#dd9606")
        ).catch(console.error);
        return;
      }
      if (position > 0) {
        const channel = newMember.guild.channels.find("name", "botspam");
        //const channel = newMember.guild.channels.find("name", "playground");
        console.log(`[${moment().format("HH:mm:ss")}] ${newMember.user.username} pakāpās uz ${newMember.hoistRole.name} grupu!`);
        channel.send(new Discord.RichEmbed()
        .setAuthor(newMember.user.username, newMember.user.avatarURL)
        .setDescription(`pakāpās uz **${newMember.hoistRole.name}** grupu!`,)
        .setColor("#14d121")
        ).catch(console.error);
        return;
      }
      if (position < 0) {
        const channel = newMember.guild.channels.find("name", "botspam");
        //const channel = newMember.guild.channels.find("name", "playground");
        console.log(`[${moment().format("HH:mm:ss")}] ${newMember.user.username} nokritās uz ${newMember.hoistRole.name} grupu!`);
        channel.send(new Discord.RichEmbed()
        .setAuthor(newMember.user.username, newMember.user.avatarURL)
        .setDescription(`nokritās uz **${newMember.hoistRole.name}** grupu!`)
        .setColor("#c41009")
        ).catch(console.error);
        return;
      }
    }
    catch (error) {
      console.log(error);
    }
  } 
  evilAngel();
});

client.on("presenceUpdate", (oldMember, newMember) => {
  try {
    if (newMember.presence.game.name === "owo") {
      newMember.addRole("361256734112743424")
      .catch(error => {
        if (error.message === "Supplied parameter was neither a Role nor a Snowflake.") {
          return;
        }
        else {
          console.log(error);
        }
      });
      console.log(`[${moment().format("HH:mm:ss")}] ${newMember.user.username} tika pievienots owo role!`);
    }
    else {
      return;
    }
  }
  catch (error) {
    if (error.message === "Cannot read property 'name' of null") {
      return;
    }
    else {
    console.log(error);
    }
  }
});