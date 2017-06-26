const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');

function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith("uj!" + str);
}

function pluck(array) {
    return array.map(function(item) { return item["name"]; });
}

function hasRole(mem, role) {
    if(pluck(mem.roles).includes(role)){
        return true;
    } else {
        return false;
    }
}

// make a new stream for each time someone starts to talk
function generateOutputFile(channel, member) {
  // use IDs instead of username cause some people have stupid emojis in their name
  const fileName = `./recordings/${channel.id}-${member.id}-${Date.now()}.pcm`;
  return fs.createWriteStream(fileName);
    }
//This is the startup area
client.on('ready', () => {
    console.log('The bot is online!');
});

/*client.on('ready', () => {
  var channel = client.channels.get('327614673799217152');
  channel.sendMessage("Hello world");
});*/

/*client.on('ready', () => */
    client.on('message', (msg) => {
    console.log(`${msg.author.username} sent a message in #${msg.channel.name} - ${msg}`);
})

client.on('guildMemberAdd', (guildMember) => {
    const nickname = guildMember.nickname || guildMember.user.username;
    guildMember.guild.defaultChannel.sendMessage(`Welcome to the ${guildMember.guild.name} party, ${nickname}!`);
});

client.on('ready', () => {
    console.log('I am now up and running!');
// Booting up messages
client.channels.get('327614673799217152').sendMessage('**I have completed booting up from a hosting service..**');
client.channels.get('327614673799217152').sendMessage({embed: {
    color: 14365848,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Unreas0nableBot is running!",
//    url: "http://google.com",
    description: "**Use uj!help for commands!**",
    fields: [{
        name: "How was Unreas0nableBot made? ",
        value: "**The creator|developer has been using this website [discord.js](https://discord.js.org/#/docs/main/stable/general/welcome) to build Unreas0nableBot.**"
      },
      {
        name: "Creator|Developer of Unreas0nableBot - **ROBLOX**",
        value: "**Unreas0nableBot Owner's [ROBLOX profile](https://www.roblox.com/users/87484452/profile)**"
//        value: "You can put [masked links](http://google.com) inside of rich embeds."

      },
      {
        name: "What version is Unreas0nableBot, currently?",
        value: "``v.7``"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Unfσrgσττεn#9982"
    }
  }
});

})

//Welcoming Users
//Var Area

//Receiving DMs

//This is the command area

client.on('message', message => {
    var args = message.content.split(/[ ]+/);
    if(commandIs("hello", message)){
//        console.log(message.author.username + args);
        message.channel.sendMessage('Hello there, ' + message.author.username);
    }
    if(commandIs("introduction", message)){
//        console.log(message.author.username + args);
        message.channel.sendMessage('UnreasonableBot is a simple bot created by Unfσrgσττεn | v.7,' + message.author.username);
    }
    if(commandIs("say", message)){
        if(hasRole(message.member, "Moderator") || hasRole(message.member, "Owner") || hasRole(message.member, "Tester")){
//            console.log(message.author.username + args);
            if(args.length === 1){
                message.channel.sendMessage('You did not define a argument. Usage: `uj!say [message to say]`');
            } else {
                message.channel.sendMessage(args.join(" ").substring(7));
                
            }
        } else {
            message.channel.sendMessage('You are not an `Admin`.');
        }
    }
    if(commandIs("delete", message)){
        if(hasRole(message.member, "Moderator") || hasRole(message.member, "Co-owner") || hasRole(message.member, "Owner")){
            if(args.length >= 3){
//                console.log(message.author.username + args);
                message.channel.sendMessage('You did not define a argument. Usage: `uj!delete (number of messages to delete)`');
            } else {
                var msg;
                if(args.length === 1){
                    msg=2;
                } else {
//                console.log(message.author.username + args);
                    msg=parseInt(args[1]) + 1;
                }
                message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
//                client.channels.get('328225959117455362').sendMessage(`${msg.author.username} - #${msg.channel.name} - ${msg}`);
            }
        } else {
            message.channel.sendMessage('You are not an `Admin`.');
        }
    }

    if(commandIs("shutdown", message)){
        if(hasRole(message.member, "Owner")){
//            console.log(message.author.username + args);
            client.channels.get('327614673799217152').sendMessage('@everyone **I am offline approximately in 1 minute.**');
        }
    }
    if(commandIs("end", message)){    
        if(hasRole(message.member, "Owner")){
//            console.log(message.author.username + args);
            process.exit();
        }
    }
        if(commandIs("makepoll", message)){
        if(hasRole(message.member, "Moderator") || hasRole(message.member, "Co-owner") || hasRole(message.member, "Owner")){
            if(args.length === 1){
                message.channel.sendMessage('You did not define a argument. Usage: `u!makepoll [question]`');
            } else {
              message.delete()
              message.channel.sendMessage(args.join(" ").substring(12));
              message.Addreaction("👍")
              message.Addreaction("👎")
            }
        } else {
            message.channel.sendMessage('You are not an `Admin`.');
        }
    }
 /*   if(commandIs("startup", message)){
        if(hasRole(message.member, "Owner")){
            console.log(message.author.username + args);
            client.channels.get('327614673799217152').sendMessage('**I have started.**');
            
        }
    }
*/    if(commandIs("testing", message)){
        if(hasRole(message.member, "Owner")){
//            console.log(message.author.username + args);    
            client.channels.get('327614673799217152').sendMessage('**I am not a complete bot.**');
        }
    }
    if(commandIs("help", message)){
//        console.log(message.author.username + args);
        client.channels.get('327614673799217152').sendMessage(" `uj!hello: responds back. uj!introduction: introduces itself to you. uj!say: repeats after you.` ");
    }
    if(commandIs("adminhelp", message)){
        if(hasRole(message.member, "Owner") || hasRole(message.member, "Co-owner") || hasRole(message.member, "Moderator")){
//            console.log(message.author.username + args);
            client.channels.get('327614673799217152').sendMessage(" `uj!kick - (tag a user to kick); uj!ban - (tag a user to ban); u!unban - (tag a user to unban; not functioning)` ")
        }
    }
    if(commandIs("ping", message)) {
        message.channel.sendMessage("Pong!");
/*    }
    if(commandIs("pm", message)) {
            if(args.length === 1){
                message.channel.sendMessage('You did not define a argument. Usage: `uj!say [message to say]`');
        } else {
            message.channel.sendMessage(message.mentions.users.first()).sendMessage();
        }
    }*/
//Dangerous Usage
    if(commandIs('warn', message)){
        console.log(message.author.username + args);
        client.channels.get('328217358399438848')
        if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
        } //else {
//            client.channels.get('328217358399438848').sendMessage(());
    }
    if(commandIs("kick", message)){
        if(hasRole(message.member, "Moderator") || hasRole(message.member, "Co-owner") || hasRole(message.member, "Owner")){
        if(args.length === 1){
//                console.log(message.author.username + args);
                message.channel.sendMessage('You did not define a argument. Usage: `uj!kick [user to kick]`');
               } else {
                 message.channel.sendMessage(args.join(" ").substring(0));
                 message.guild.member(message.mentions.users.first()).kick();
                 //client.channels.get('328225959117455362').sendMessage((args.join(" ").substring(0));
            }
        }
    }
/*    if(commandIs("mute", message)){
        if(hasRole(message.member, "Moderator") || hasRole(message.member, "Co-owner") || hasRole(message.member, "Owner")){
        if(args.length === 1){
                console.log(message.author.username + args);
                message.channel.sendMessage('You did not define a argument. Usage: `u!mute [user to mute]`');
            } else {
                message.guild.member(message.mentions.users.first()).client.addMemberToRole("Muted");
                message.guild.member(message.mentions.users.first()).client.removeMemberFromRole();
            }
        }
    }
*/    if(commandIs("ban", message)){
        if(hasRole(message.member, "Moderator") || hasRole(message.member, "Owner") || hasRole(message.member,"Co-owner")){
            if(args.length === 1){
//                console.log(message.author.username + args);
                message.channel.sendMessage('You did not define a argument. Usage: `uj!ban [user to ban]`');
                } else {
                    message.guild.member(message.mentions.users.first()).ban();
            }
        } else {
            message.channel.sendMessage('You are not an `Admin`.');
        }
    }
/*    if(commandIs("unban", message)){
        if(hasRole(message.member, "Moderator") || hasRole(message.member, "Owner") || hasRole(message.member,"Co-owner")){
            if(args.length === 1){
                console.log(message.author.username + args);
                message.channel.sendMessage('You did not define a argument. Usage: `u!unban [user to provoke ban]`');
                } else {
                    message.guild.member(message.mentions.users.first()).unban('');
            }
        } else {
            message.channel.sendMessage('You are not an `Admin`.');
        }
    }
//    if(commandIs("strike", message)){
  //      if(hasRole(message.member, "Moderator") || hasRole(message.member, "Owner") || hasRole(message.member,"Co-owner")){
    //        if(args.length === 1){
      //          console.log(message.author.username + args);
        //        message.channel.sendMessage
          //  }
   // }
//This is the fun area
*/    if(message.content === "(╯°□°）╯︵ ┻━┻") {
//        console.log(message.author.username + args);
        message.channel.send("┬─┬ ノ( ゜-゜ノ) **DO NOT FLIP THE TABLE!**");
    }
});
//This is the embed area
/*    if(commandIs("embed", message)){
client.channels.get('327614673799217152').sendMessage({embed: {
  color: 3447003,
  description: "A very simple Embed!"
}});
//This is the help area
} */    

//This is the testing area
/*    if(commandIs("ping", message)) {
        message.channel.sendMessage("Pong!");
    }
*/
//This is the setting area

client.on('ready', () => {
    client.user.setGame("use uj!help")
    console.log("client.user.setGame(**use uj!help**) is successful")
})

//client.on('ready', () => {
//    client.user.setGame("being modified")
//    console.log("client.user.setGame(**use uj!help**) is successful")
//})

client.login('MzI3NjEwMDEyMzgzODM4MjIw.DC38Zg.TFvHj4ER_Jhtt2sHozamarO4mdY');