require("dotenv").config();

const fs = require("fs");

const {
Client,
Collection,
GatewayIntentBits,
ActivityType
} = require("discord.js");

const interactionHandler =
require("./events/interactionCreate");

const messageDelete =
require("./events/messageDelete");

const ready =
require("./events/ready");

const guildMemberAdd =
require("./events/guildMemberAdd");

const client =
new Client({

intents: [

GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers,
GatewayIntentBits.GuildMessages

]

});

client.commands =
new Collection();

/*
Komutları yükle
*/

const commandFiles =

fs
.readdirSync("./commands")
.filter(
file =>
file.endsWith(".js")
);

for (
const file
of commandFiles
) {

const command =
require(
`./commands/${file}`
);

client.commands.set(

command.data.name,

command

);

}

/*
Bot hazır
*/

client.once(

"ready",

async () => {

console.log(
`${client.user.tag} hazır.`
);

client.user.setActivity(

"Made by Atilla Şekerci",

{

type:
ActivityType.Listening

}

);

await ready(
client
);

}

);

/*
Slash komutlar
*/

client.on(

"interactionCreate",

async interaction => {

if (
!interaction.isChatInputCommand()
)
return;

const command =

client.commands.get(
interaction.commandName
);

if (
!command
)
return;

try {

await command.execute(
interaction,
client
);

}

catch (err) {

console.log(err);

try {

if (

interaction.replied ||

interaction.deferred

) {

await interaction.followUp({

content:
"Komut çalıştırılamadı.",

flags:64

});

}

else {

await interaction.reply({

content:
"Komut çalıştırılamadı.",

flags:64

});

}

}

catch {}

}

}

);

/*
Dropdown
*/

client.on(
"interactionCreate",
interactionHandler
);

/*
Panel koruma
*/

client.on(
"messageDelete",
messageDelete
);

/*
Hoş geldin
*/

client.on(
"guildMemberAdd",
guildMemberAdd
);

client.login(
process.env.TOKEN
);