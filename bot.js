const Discord = require("discord.js");
const osu = require("node-osu");
const moment = require("moment");
const moment_tz = require("moment-timezone");
const config = require("./config.json");
const fs = require("fs");

const client = new Discord.Client();
const osuApi = new osu.Api(config.apiKey);

client.login(config.token);

client.on("ready", () => {
  console.log(`[${moment().format("HH:mm:ss")}] Touch fluffy tail =w=`);
  client.user.setGame("with fire");
});

client.on("message", (message) => {
  function checkRank(LVRank, osulink, i) {
    if (LVRank === 1) {
      message.guild.member(osulink[i].discord_id).addRole("202057149860282378").catch(console.error);
      setTimeout(() => {
      message.guild.member(osulink[i].discord_id).removeRoles(["202061474213003265", "202061507037495296", "202061546787045377", "202061582006485002", "202061613644251136", "297854952435351552", "348195423841943564"]).catch(console.error);
      }, 2000);
      return 100;
     }
     else if (LVRank <= 5) {
      message.guild.member(osulink[i].discord_id).addRole("202061474213003265").catch(console.error);
      setTimeout(() => {
      message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061507037495296", "202061546787045377", "202061582006485002", "202061613644251136", "297854952435351552", "348195423841943564"]).catch(console.error);
      }, 2000);
      return 75;
     }
     else if (LVRank <= 10) {
      message.guild.member(osulink[i].discord_id).addRole("202061507037495296").catch(console.error);
      setTimeout(() => {
      message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061474213003265", "202061546787045377", "202061582006485002", "202061613644251136", "297854952435351552", "348195423841943564"]).catch(console.error);
      }, 2000);
      return 50;
     }
     else if (LVRank <= 25) {
      message.guild.member(osulink[i].discord_id).addRole("202061546787045377").catch(console.error);
      setTimeout(() => {
      message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061474213003265", "202061507037495296", "202061582006485002", "202061613644251136", "297854952435351552", "348195423841943564"]).catch(console.error);
      }, 2000);
      return 40;
     }
     else if (LVRank <= 50) {
       message.guild.member(osulink[i].discord_id).addRole("202061582006485002").catch(console.error);
      setTimeout(() => {
      message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061474213003265", "202061507037495296", "202061546787045377", "202061613644251136", "297854952435351552", "348195423841943564"]).catch(console.error);
      }, 2000);
      return 30;
     }
     else if (LVRank <= 100) {
      message.guild.member(osulink[i].discord_id).addRole("202061613644251136").catch(console.error);
      setTimeout(() => {
      message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061474213003265", "202061507037495296", "202061546787045377", "202061582006485002", "297854952435351552", "348195423841943564"]).catch(console.error);
      }, 2000);
      return 20;
     }
     else {
      message.guild.member(osulink[i].discord_id).addRole("297854952435351552").catch(console.error);
      setTimeout(() => {
      message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061474213003265", "202061507037495296", "202061546787045377", "202061582006485002", "202061613644251136", "348195423841943564"]).catch(console.error);
      }, 2000);
      return 10;
     }
}

  function getDifference(scores, q) {
    let scoreTime = scores[q].raw_date;
    let osuTime = moment_tz.tz(scoreTime, "Australia/Perth");
    let latvianTime = osuTime.clone().tz("Europe/Riga").format("YYYY-MM-DD HH:mm:ss");
    return [moment().diff(latvianTime), latvianTime];
  }
  
  function checkScoreRank(scores, q) {
    if (scores[q].counts.miss === "0") {
      return scores[q].rank;
    }
    else if (scores[q].counts.miss === "1"){
      return `${scores[q].rank} ${scores[q].counts.miss}x miss`;
    }
    else {
      return `${scores[q].rank} ${scores[q].counts.miss}x misses`;
    }
  }
  
  function getDelay(difference) {
    let min = Math.floor(difference / 60000);
    let sec = ((difference % 60000) / 1000).toFixed(0);

    if (min === 0 && sec === 1) {
      return `Pirms ${sec} sekundes`
    }
    if (min === 0 && sec != 1) {
      return `Pirms ${sec} sekundēm`
    }
    else if (min === 1 && sec === 1) {
      return `Pirms ${min} minūtes un ${sec} sekundes`;
    }
    else if (min === 1 && sec === 0) {
      return `Pirms ${min} minūtes`
    }
    else if (min != 1 && sec === 0) {
      return `Pirms ${min} minūtēm`
    }
    else if (min === 1 && sec != 1) {
      return `Pirms ${min} minūtes un ${sec} sekundēm`;
    }
    else if (min != 1 && sec === 1)  {
      return `Pirms ${min} minūtēm un ${sec} sekundes`;
    }
    else {
      return `Pirms ${min} minūtēm un ${sec} sekundēm`;
    }  
  }
  
  function checkMods(scores, q) {
    if (scores[q].mods[0] === undefined) {
      return [false, false, true];
    }
    else {
    for (let k = 0;k < scores[q].mods.length; k++) {
      if (scores[q].mods[k] === "DT") {
        return [true, false, false];
      }
      else if (scores[q].mods[k] === "HT") {
        return [false, true, false];
      }
      else if (k === (scores[q].mods.length - 1)) {
        return [false, false, true];
      }
      }
    }
  }
  
  function lengthAndBpm(dt, ht, other, beatmaps) {
    if (dt) {
      let bpm = `${beatmaps[0].bpm} (${Math.floor(beatmaps[0].bpm * 1.5)})`
      let m = Math.floor(beatmaps[0].time.total / 60);
      let sf = Math.floor(beatmaps[0].time.total % 60);
      let s = ("0" + sf).slice(-2);
      let m2 = Math.floor(beatmaps[0].time.total / 3 * 2 / 60); 
      let s2f = Math.floor(beatmaps[0].time.total / 3 * 2 % 60);
      let s2 = ("0" + s2f).slice(-2);
      let laiks = `${m}:${s} (${m2}:${s2})`;
      return [bpm, laiks];
    }
    else if (ht) {
      let bpm = `${beatmaps[0].bpm} (${Math.floor(beatmaps[0].bpm * 0.75)})`
      let m = Math.floor(beatmaps[0].time.total / 60);
      let sf = Math.floor(beatmaps[0].time.total % 60);
      let s = ("0" + sf).slice(-2);
      let m2 = Math.floor(beatmaps[0].time.total / 3 * 4 / 60);
      let s2f = Math.floor(beatmaps[0].time.total / 3 * 4 % 60);
      let s2 = ("0" + s2f).slice(-2);
      let laiks = `${m}:${s} (${m2}:${s2})`;
      return [bpm, laiks];
    }
    else if (other) {
      let bpm = beatmaps[0].bpm;
      let m = Math.floor(beatmaps[0].time.total / 60);
      let sf = Math.floor(beatmaps[0].time.total % 60);
      let s = ("0" + sf).slice(-2);
      let laiks = `${m}:${s}`;
      return [bpm, laiks];
    }
  }
  function getAccuracy(scores, q) {
    let tris = parseInt(scores[q].counts["300"]);
    let simts = parseInt(scores[q].counts["100"]);
    let piecdesmit = parseInt(scores[q].counts["50"]);
    let miss = parseInt(scores[q].counts.miss);
    let points = (piecdesmit * 50) + (simts * 100) + (tris * 300);
    let hits = miss + piecdesmit + simts + tris;
    let formula = points / (hits * 300);
    let komats = formula * 100;
    return Math.round(komats * 100) / 100;
  }

  function getMods(scores, q) {
    if (scores[q].mods[0] === undefined) {
      return "nomod";
    }
    else {
      return scores[q].mods.join("");
    }
  }

  function getApprovalStatus(beatmaps) {
    if (beatmaps[0].approvalStatus === undefined) {
      return "Loved";
    }
    else {
      return beatmaps[0].approvalStatus;
    }
  }

  function postScore(user, scores, beatmaps, limits, rank, accuracy, laiks, bpm, delay, latvianTime, q) {
    let pp = Math.round(scores[q].pp * 100) / 100;
    let totalpp = Math.round(user.pp.raw * 100) / 100;
  
    let mods = getMods(scores, q);
    const channel = message.guild.channels.find("name", "botspam");
    let difficulty = Math.round(beatmaps[0].difficulty.rating * 100) / 100;
  
    let z = parseInt(q);
  
    channel.send(new Discord.RichEmbed()
    .setAuthor(user.name, `https://a.ppy.sh/${user.id}`, `https://osu.ppy.sh/u/${user.id}`)
    .setThumbnail(`https://b.ppy.sh/thumb/${beatmaps[0].beatmapSetId}l.jpg`)
    .setColor(34047)
    .setDescription(`__**${pp}pp |** **#${z + 1}** personal best **|** Max:${limits}__ 
#${parseInt(user.pp.rank).toLocaleString()} **|** #${user.pp.countryRank} ${user.country} **|** ${totalpp.toLocaleString()}pp
x${scores[q].maxCombo}/${beatmaps[0].maxCombo} **|** ${rank} **|** ${parseInt(scores[q].score).toLocaleString()} **|** ${accuracy}% **|** ${mods}
[${beatmaps[0].artist} - ${beatmaps[0].title} [${beatmaps[0].version}]](https://osu.ppy.sh/b/${scores[q].beatmapId})
${laiks} **|** ${bpm} BPM **|** ★**${difficulty}**`)
    .setFooter(`${delay} ${moment(latvianTime).format("HH:mm DD/MM/YYYY")}`)
    ).catch(console.error);
  }

  function getColor(truePlace) {
    if (truePlace === 1) {
      return 16751872;
    }
    else {
      return 4472063;
    }
  }

  function postLeaderboardScore(user, delay, beatmaps, truePlace, latvianTime, scores, w) {
    const channel = message.guild.channels.find("name", "botspam");
    let color = getColor(truePlace);
    let rank = checkScoreRank(scores, w);
    let accuracy = getAccuracy(scores, w);
    let mods = getMods(scores, w);
    let modi = checkMods(scores, w);
    let dt = modi[0];
    let ht = modi[1];
    let other = modi[2];
    let ilgumsunbpm = lengthAndBpm(dt, ht, other, beatmaps);
    let bpm = ilgumsunbpm[0];
    let laiks = ilgumsunbpm[1];
    let difficulty = Math.round(beatmaps[0].difficulty.rating * 100) / 100;
    let status = getApprovalStatus(beatmaps);

    channel.send(new Discord.RichEmbed()
    .setAuthor(user.name, `https://a.ppy.sh/${user.id}`, `https://osu.ppy.sh/u/${user.id}`)
    .setThumbnail(`https://b.ppy.sh/thumb/${beatmaps[0].beatmapSetId}l.jpg`)
    .setColor(color)
    .setDescription(`__ieguva **${truePlace}.**vietu **${status}** mapē:__
[${beatmaps[0].artist} - ${beatmaps[0].title} [${beatmaps[0].version}]](https://osu.ppy.sh/b/${beatmaps[0].id})
x${scores[w].maxCombo}/${beatmaps[0].maxCombo} **|** ${rank} **|** ${parseInt(scores[w].score).toLocaleString()} **|** ${accuracy}% **|** ${mods}
${laiks} **|** ${bpm} BPM **|** ★**${difficulty}**`)
    .setFooter(`${delay} ${moment(latvianTime).format("HH:mm DD/MM/YYYY")}`)
    ).catch(console.error);
  }

  function trackLeaderboardScores(user) {
    for (let t = 0; t < user.events.length; t++) {
      let getdifference = getDifference(user.events, t);
      let difference = getdifference[0];
      let latvianTime = getdifference[1];
        if (difference <= 660000) {
          let delay = getDelay(difference);
          let string = user.events[t].html;
          let pos = string.indexOf("#");
          let vieta = string.slice(pos + 1, pos + 4);
          let split = vieta.split("</");
          let place = parseInt(split[0]);
          if (place <= 100) {
            osuApi.getScores({b: user.events[t].beatmapId})
            .then(scores => {
              for (let w = 0; w < scores.length; w++) {
                if (scores[w].user.id === user.id) {
                  let atskiriba = moment(user.events[t].raw_date).diff(moment(scores[w].raw_date));
                  console.log(atskiriba);
                  if (atskiriba > 0 && atskiriba <= 10000) {
                    let truePlace = w + 1;
                    osuApi.getBeatmaps({b: user.events[t].beatmapId})
                    .then(beatmaps => {
                      console.log(beatmaps[0].approvalStatus);
                      if (beatmaps[0].approvalStatus != "Qualified") {
                        postLeaderboardScore(user, delay, beatmaps, truePlace, latvianTime, scores, w);
                      }
                    }).catch(console.error)
                }
                }
              }
            }).catch(console.error);
          }
        }
    }
  }

  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const prefix = config.prefix;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  if (command === "hello") {
    message.guild.member(message.author).addRole("361256307044646924").catch(console.error);
    return;
  }
  if (message.author.id !== config.ownerID) {
    if (message.author.id !== config.waywernID) {
      return;
    }
  }
  if (command === "check") {
    message.channel.send("Jebal mazaa");
    function check() {
    let parse = fs.readFileSync("./osulink.json");
    let osulink = JSON.parse(parse);
    console.log(`[${moment().format("HH:mm:ss")}] Sāku pārbaudīt scorus...`);
    console.log(`[${moment().format("HH:mm:ss")}] Šī pārbaude aizņems aptuveni ${osulink.length * 4 / 60} minūtes!`);
    for (let i in osulink) {
    setTimeout(function() {
      osuApi.getUser({u: osulink[i].osu_id})
      .then(user => {
        let LVRank = parseInt(user.pp.countryRank);
        console.log(`[${moment().format("HH:mm:ss")}] ${user.name} - #${LVRank} LV`);
        console.log(`[${moment().format("HH:mm:ss")}] Pašlaik pārbaudu ${user.name} scorus!`);
        trackLeaderboardScores(user);

        let limits = checkRank(LVRank, osulink, i);
        osuApi.getUserBest({u: osulink[i].osu_id, limit: limits})
        .then(scores => {
          for (let q = 0; q < scores.length; q++) {
            let getdifference = getDifference(scores, q);
            let difference = getdifference[0];
            let latvianTime = getdifference[1];
            if (difference <= 660000) {
              let rank = checkScoreRank(scores, q);
              let delay = getDelay(difference)
              let modi = checkMods(scores, q);
              let dt = modi[0];
              let ht = modi[1];
              let other = modi[2];
              let accuracy = getAccuracy(scores, q);
              osuApi.getBeatmaps({b: scores[q].beatmapId})
              .then(beatmaps => {
                let ilgumsunbpm = lengthAndBpm(dt, ht, other, beatmaps);
                let bpm = ilgumsunbpm[0];
                let laiks = ilgumsunbpm[1];
                postScore(user, scores, beatmaps, limits, rank, accuracy, laiks, bpm, delay, latvianTime, q);
              }).catch(console.error);
            }
          }
        }).catch(console.error);
      }).catch(console.error);
    }, i * 4000);
    }
  }
    setInterval(check, 660000);
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
    message.channel.send("Lietotājs tika pievienots datubāzei!")
    console.log(`[${moment().format("HH:mm:ss")}] ${message.author.username} pievienoja jaunu lietotāju: discord_id - ${discord_id} osu_id - ${osu_id} note - ${note}`);
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
        let channel = newMember.guild.channels.find("name", "botspam");
        console.log(`[${moment().format("HH:mm:ss")}] ${newMember.user.username} tika unrestricots! :)`)
        channel.send(new Discord.RichEmbed()
        .setAuthor(newMember.user.username, newMember.user.avatarURL)
        .setDescription("tika unrestricots! :)")
        .setColor("#14d121")
        ).catch(console.error);
        return;
      }
      if (position > 0 && newMember.hoistRole.name === "#1 LV") {
        let channel = newMember.guild.channels.find("name", "botspam");
        console.log(`[${moment().format("HH:mm:ss")}] ${newMember.user.username} pakāpās uz ${newMember.hoistRole.name} grupu!`);
        channel.send(new Discord.RichEmbed()
        .setAuthor(newMember.user.username, newMember.user.avatarURL)
        .setDescription(`pakāpās uz **${newMember.hoistRole.name}** grupu!`)
        .setColor("#dd9606")
        ).catch(console.error);
        return;
      }
      if (position > 0) {
        let channel = newMember.guild.channels.find("name", "botspam");
        console.log(`[${moment().format("HH:mm:ss")}] ${newMember.user.username} pakāpās uz ${newMember.hoistRole.name} grupu!`);
        channel.send(new Discord.RichEmbed()
        .setAuthor(newMember.user.username, newMember.user.avatarURL)
        .setDescription(`pakāpās uz **${newMember.hoistRole.name}** grupu!`,)
        .setColor("#14d121")
        ).catch(console.error);
        return;
      }
      if (position < 0) {
        let channel = newMember.guild.channels.find("name", "botspam");
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
      console.log(`[${moment().format("HH:mm:ss")}] "owo" role has been added to ${newMember.user.username}`);
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

client.on("guildBanAdd", (guild, user) => {
  console.log(`[${moment().format("HH:mm:ss")}] ${user.username} has been banned from the ${guild.name} server!`)
  let channel = guild.channels.find("name", "botspam");
  try {
    channel.send(`**${user.username}** tika nobanots no šī servera!`);
  }
  catch (error) {
    if (error.message === "Cannot read property 'send' of null") {
      return;
    }
    else {
      console.log(error);
    }
  }
});

client.on("guildBanRemove", (guild, user) => {
  console.log(`[${moment().format("HH:mm:ss")}] has been unbanned from the ${guild.name} server`)
  let channel = guild.channels.find("name", "botspam");
  try {
    channel.send(`**${user.username}** tika unbanots no šī servera!`)
  }
  catch (error) {
    if (error.message === "Cannot read property 'send' of null") {
      return;
    }
    else {
      console.log(error);
    }
  }
});

client.on("guildMemberAdd", (member) => {
  console.log(`[${moment().format("HH:mm:ss")}] ${member.user.username} joined the ${member.guild.name} server!`);
  let channel = member.guild.channels.find("name", "botspam");
  try {
    channel.send(`${member.user} pievienojās serverim!`);
  }
  catch (error) {
    if (error.message === "Cannot read property 'send' of null") {
      return;
    }
    else {
      console.log(error);
    }
  }
});

client.on("guildMemberRemove", (member) => {
  console.log(`[${moment().format("HH:mm:ss")}] ${member.user.username} has left the ${member.guild.name} server!`);
  let channel = member.guild.channels.find("name", "botspam");
  try {
    channel.send(`**${member.user.username}** pameta šo serveri vai tika kickots!`);
  }
  catch (error) {
    if (error.message === "Cannot read property 'send' of null") {
      return;
    }
    else {
      console.log(error);
    }
  }
});
