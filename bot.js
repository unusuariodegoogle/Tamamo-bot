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
    setInterval(main, 600000);
    main(message);
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

function main(message) {
  message.channel.send("Jebal mazaa");
  let parse = fs.readFileSync("./osulink.json");
  let osulink = JSON.parse(parse);
  console.log(`[${moment().format("HH:mm:ss")}] Sāku pārbaudīt scorus...`);
  console.log(`[${moment().format("HH:mm:ss")}] Šī pārbaude aizņems aptuveni ${Math.round(osulink.length * 4 / 60)} minūtes!`);
  for (let i in osulink) {
    let message = message;
    setInterval(checkRank, 4000);
    checkRank(i, osulink, message);
  }
}
function checkRank(i, osulink, message) {
  osuApi.getUser({u: osulink[i].osu_id})
  .then(user => {
    let message = message;
    let LVRank = parseInt(user.pp.countryRank);
    console.log(`[${moment().format("HH:mm:ss")}] ${user.name} - #${LVRank} LV`);
    console.log(`[${moment().format("HH:mm:ss")}] Pašlaik pārbaudu ${user.name} scorus!`);
    if (LVRank === 1) {
      message.guild.member(osulink[i].discord_id).addRole("202057149860282378").catch(console.error);
      setTimeout(() => {
      message.guild.member(osulink[i].discord_id).removeRoles(["202061474213003265", "202061507037495296", "202061546787045377", "202061582006485002", "202061613644251136", "297854952435351552", "348195423841943564"]).catch(console.error);
      }, 2000);
      let limits = 100;
      checkUserBest(i, osulink, limits, user, message);
     }
     else if (LVRank <= 5) {
      message.guild.member(osulink[i].discord_id).addRole("202061474213003265").catch(console.error);
      setTimeout(() => {
      message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061507037495296", "202061546787045377", "202061582006485002", "202061613644251136", "297854952435351552", "348195423841943564"]).catch(console.error);
      }, 2000);
      let limits = 75;
      checkUserBest(i, osulink, limits, user, message);
     }
     else if (LVRank <= 10) {
      message.guild.member(osulink[i].discord_id).addRole("202061507037495296").catch(console.error);
      setTimeout(() => {
      message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061474213003265", "202061546787045377", "202061582006485002", "202061613644251136", "297854952435351552", "348195423841943564"]).catch(console.error);
      }, 2000);
      let limits = 50;
      checkUserBest(i, osulink, limits, user, message);
     }
     else if (LVRank <= 25) {
      message.guild.member(osulink[i].discord_id).addRole("202061546787045377").catch(console.error);
      setTimeout(() => {
      message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061474213003265", "202061507037495296", "202061582006485002", "202061613644251136", "297854952435351552", "348195423841943564"]).catch(console.error);
      }, 2000);
      let limits = 40;
      checkUserBest(i, osulink, limits, user, message);
     }
     else if (LVRank <= 50) {
      message.guild.member(osulink[i].discord_id).addRole("202061582006485002").catch(console.error);
      setTimeout(() => {
      message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061474213003265", "202061507037495296", "202061546787045377", "202061613644251136", "297854952435351552", "348195423841943564"]).catch(console.error);
      }, 2000);
      let limits = 30;
      checkUserBest(i, osulink, limits, user, message);
     }
     else if (LVRank <= 100) {
      message.guild.member(osulink[i].discord_id).addRole("202061613644251136").catch(console.error);
      setTimeout(() => {
      message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061474213003265", "202061507037495296", "202061546787045377", "202061582006485002", "297854952435351552", "348195423841943564"]).catch(console.error);
      }, 2000);
      let limits = 20;
      checkUserBest(i, osulink, limits, user, message);
     }
     else {
      message.guild.member(osulink[i].discord_id).addRole("297854952435351552").catch(console.error);
      setTimeout(() => {
      message.guild.member(osulink[i].discord_id).removeRoles(["202057149860282378", "202061474213003265", "202061507037495296", "202061546787045377", "202061582006485002", "202061613644251136", "348195423841943564"]).catch(console.error);
      }, 2000);
      let limits = 10;
      checkUserBest(i, osulink, limits, user, message);
     }

  }).catch(console.error);
}

function checkUserBest(i, osulink, limits, user, message) {
  osuApi.getUserBest({u: osulink[i].osu_id, limit: limits})
  .then(scores => {
    for (let q in scores) {
      let message = message;
      let scoreTime = scores[q].raw_date;
      let osuTime = moment_tz.tz(scoreTime, "Australia/Perth");
      let latvianTime = osuTime.clone().tz("Europe/Riga").format("YYYY-MM-DD HH:mm:ss");
      let difference = moment().diff(latvianTime);
      if (difference <= 600000) {
        if (scores[q].rank === "SS" || scores[q].rank === "S" || scores[q].rank === "SH" || scores[q].rank === "SSH"){
          let rank = scores[q].rank;
          checkBeatmapInfo(scores, rank, user, q, difference, message);
        }
        else {
          if (scores[q].counts.miss === "1"){
            let rank = `${scores[q].rank} ${scores[q].counts.miss}x miss`;
            checkBeatmapInfo(scores, rank, user, q, difference, message);
          }
          else {
            let rank = `${scores[q].rank} ${scores[q].counts.miss}x misses`;
            checkBeatmapInfo(scores, rank, user, q, difference, message);
          }
        } 
      }
    }
  }).catch(console.error);
}

function checkBeatmapInfo(scores, rank, user, q, difference, message) {
  osuApi.getBeatmaps({b: scores[q].beatmapId})
  .then(beatmaps => {
    let message = message;
    let min = Math.floor(difference / 60000);
    let sec = ((difference % 60000) / 1000).toFixed(0);

    let mods = scores[q].mods.join("");

    if (min === 1 && sec === 1) {
      let delay = `Pirms ${min} minūtes un ${sec} sekundes`;
      checkMods(delay, q, scores, user, beatmaps, rank, message);
    }
    else if (min === 1 && sec != 1) {
      let delay = `Pirms ${min} minūtes un ${sec} sekundēm`;
      checkMods(delay, q, scores, user, beatmaps, rank, message);
    }
    else if (min != 1 && sec === 1)  {
      let delay = `Pirms ${min} minūtēm un ${sec} sekundes`;
      checkMods(delay, q, scores, user, beatmaps, rank, message);
    }
    else {
      let delay = `Pirms ${min} minūtēm un ${sec} sekundēm`;
      checkMods(delay, q, scores, user, beatmaps, rank, message);
    }
  }).catch(console.error);
}

function checkMods(delay, q, scores, user, beatmaps, rank, message) {
  let message = message;
  for (k in scores[q].mods) {
    if (scores[q].mods[k] === "DT") {
      let dt = true;
      modsEval(delay, q, scores, user, beatmaps, rank, dt, message);
    }
    else if (scores[q].mods[k] === "HT") {
      let ht = true;
      modsEval(delay, q, scores, user, beatmaps, rank, ht, message);
    }
    else {
      let mod = false;
      modsEval(delay, q, scores, user, beatmaps, rank, mod, message);
    }
  }
}

function modsEval(delay, q, scores, user, beatmaps, rank, mod, message) {
  let message = message;
  if (mod) {
    let bpm = `${beatmaps[0].bpm} (${Math.floor(beatmaps[0].bpm * 1.5)})`
    let m = Math.floor((beatmaps[0].time.total) / 60);
    let sf = Math.floor(beatmaps[0].time.total) % 60;
    let s = ("0" + sf).slice(-2);
    let m2 = Math.floor((beatmaps[0].time.total * (2/3)) / 60);
    let s2f = Math.floor((beatmaps[0].time.total * (2/3)) % 60);
    let s2 = ("0" + s2f).slice(-2);
    let laiks = `${m}:${s} (${m2}:${s2})`;
    postScore(delay, q, scores, user, beatmaps, rank, bpm, laiks, message);
  }
  else if (mod) {
    let bpm = `${beatmaps[0].bpm} (${Math.floor(beatmaps[0].bpm * 0.75)})`
    let m = Math.floor((beatmaps[0].time.total) / 60);
    let sf = Math.floor(beatmaps[0].time.total) % 60;
    let s = ("0" + sf).slice(-2);
    let m2 = Math.floor((beatmaps[0].time.total * (4/3)) / 60);
    let s2f = Math.floor((beatmaps[0].time.total * (4/3)) % 60);
    let s2 = ("0" + s2f).slice(-2);
    let laiks = `${m}:${s} (${m2}:${s2})`;
    postScore(delay, q, scores, user, beatmaps, rank, bpm, laiks, message);
  }
  else {
    let bpm = beatmaps[0].bpm;
    let m = Math.floor((beatmaps[0].time.total) / 60);
    let sf = Math.floor(beatmaps[0].time.total) % 60;
    let s = ("0" + sf).slice(-2);
    let laiks = `${m}:${s}`;
    postScore(delay, q, scores, user, beatmaps, rank, bpm, laiks, message);
  }
}

function postScore(delay, q, scores, user, beatmaps, rank, bpm, laiks, message) {
  const channel = message.guild.channels.find("name", "botspam");
  let z = parseInt(q);

  let difficulty = Math.round(beatmaps[0].difficulty.rating * 100) / 100;

  let tris = parseInt(scores[q].counts["300"]);
  let simts = parseInt(scores[q].counts["100"]);
  let piecdesmit = parseInt(scores[q].counts["50"]);
  let miss = parseInt(scores[q].counts.miss);
  let points = (piecdesmit * 50) + (simts * 100) + (tris * 300);
  let hits = miss + piecdesmit + simts + tris;
  let formula = points / (hits * 300);
  let komats = formula * 100;
  let accuracy = Math.round(komats * 100) / 100;

  let pp = Math.round(scores[q].pp * 100) / 100;
  let totalpp = Math.round(user.pp.raw * 100) / 100;

  if (scores[q].mods[0] === undefined) {
    channel.send(new Discord.RichEmbed()
    .setAuthor(user.name, `https://a.ppy.sh/${user.id}`, `https://osu.ppy.sh/u/${user.id}`)
    .setThumbnail(`https://b.ppy.sh/thumb/${beatmaps[0].beatmapSetId}l.jpg`)
    .setDescription(`__**${pp}pp |** #${z + 1} personal best **|** max - top ${limits}__ 
#${parseInt(user.pp.rank).toLocaleString()} **|** #${user.pp.countryRank} ${user.country} **|** ${totalpp.toLocaleString()}pp
x${scores[q].maxCombo}/${beatmaps[0].maxCombo} **|** ${rank} **|** ${parseInt(scores[q].score).toLocaleString()} **|** ${accuracy}% **|** nomod
[${beatmaps[0].artist} - ${beatmaps[0].title} [${beatmaps[0].version}]](https://osu.ppy.sh/b/${scores[q].beatmapId})
${laiks} **|** ${bpm} BPM **|** ★**${difficulty}**`)
    .setFooter(`${delay} ${moment(latvianTime).format("HH:mm DD/MM/YYYY")}`)
    ).catch(console.error);
    }
  else {
    channel.send(new Discord.RichEmbed()
    .setAuthor(user.name, `https://a.ppy.sh/${user.id}`, `https://osu.ppy.sh/u/${user.id}`)
    .setThumbnail(`https://b.ppy.sh/thumb/${beatmaps[0].beatmapSetId}l.jpg`)
    .setDescription(`__**${pp}pp |** #${z + 1} personal best **|** max - top ${limits}__
#${parseInt(user.pp.rank).toLocaleString()} **|** #${user.pp.countryRank} ${user.country} **|** ${totalpp.toLocaleString()}pp
x${scores[q].maxCombo}/${beatmaps[0].maxCombo} **|** ${rank} **|** ${parseInt(scores[q].score).toLocaleString()} **|** ${accuracy}% **|** ${mods}
[${beatmaps[0].artist} - ${beatmaps[0].title} [${beatmaps[0].version}]](https://osu.ppy.sh/b/${scores[q].beatmapId})
${laiks} **|** ${bpm} BPM **|** ★**${difficulty}**`)
    .setFooter(`${delay} ${moment(latvianTime).format("HH:mm DD/MM/YYYY")}`)
    ).catch(console.error);
    }
}