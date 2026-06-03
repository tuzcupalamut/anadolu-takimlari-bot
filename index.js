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

intents:[

GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers,
GatewayIntentBits.GuildMessages

]

});

client.commands =
new Collection();

/*
KOMUTLARI YÜKLE
*/

const commandFiles =

fs
.readdirSync("./commands")
.filter(
f =>
f.endsWith(".js")
);

for (
const file
of commandFiles
) {

try {

const command =
require(
`./commands/${file}`
);

if (

command.data &&
command.execute

) {

client.commands.set(

command.data.name,

command

);

}

}

catch (err) {

console.log(
`${file} yüklenemedi`
);

console.log(err);

}

}

/*
READY
*/

client.once(

"ready",

async () => {

console.log(
`${client.user.tag} hazır`
);

client.user.setActivity(

"made by professor",

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
INTERACTION
*/

client.on(

"interactionCreate",

async interaction => {

try {

/*
Dropdown
*/

if (
interaction.isStringSelectMenu()
) {

return await interactionHandler(
interaction
);

}

/*
Slash
*/

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

/*
Komutu çalıştır
*/

await command.execute(
interaction,
client
);

}

catch (err) {

console.log(
"HATA:",
err
);

/*
Discord interaction kapanmış
*/

if (

err?.code === 10062 ||
err?.code === 40060

) {

return;

}

try {

if (

interaction.deferred

) {

await interaction.editReply({

content:
"Komut çalıştırılamadı."

});

}

}

catch {}

}

}

);

/*
EVENTLER
*/

client.on(
"messageDelete",
messageDelete
);

client.on(
"guildMemberAdd",
guildMemberAdd
);

client.login(
process.env.TOKEN);