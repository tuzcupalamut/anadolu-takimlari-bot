require("dotenv").config();

const fs = require("fs");

const {
Client,
Collection,
GatewayIntentBits
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

const commandFiles =

fs

.readdirSync(
"./commands"
)

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

client.once(

"ready",

async () => {

console.log(
`${client.user.tag} hazır.`
);

await ready(
client
);

}

);

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

if (
!interaction.replied
) {

await interaction.reply({

content:
"Komut çalıştırılamadı.",

flags:64

});

}

}

}

);

client.on(
"interactionCreate",
interactionHandler
);

client.on(
"messageDelete",
messageDelete
);

client.on(
"guildMemberAdd",
guildMemberAdd
);

client.login(
process.env.TOKEN
);