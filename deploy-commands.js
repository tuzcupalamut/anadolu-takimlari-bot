require("dotenv").config();

const fs = require("fs");

const {
REST,
Routes
} = require("discord.js");

const commands = [];

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

try {

const command =
require(
`./commands/${file}`
);

if (
!command.data
) {

console.log(
`Atlandı: ${file}`
);

continue;

}

commands.push(
command.data.toJSON()
);

console.log(
`Yüklendi: ${file}`
);

}

catch (err) {

console.log(
`HATA → ${file}`
);

console.log(
err.message
);

}

}

const rest =
new REST({

version:
"10"

}).setToken(
process.env.TOKEN
);

(async () => {

try {

console.log(
"Komutlar yükleniyor..."
);

await rest.put(

Routes.applicationGuildCommands(

process.env.CLIENT_ID,

process.env.GUILD_ID

),

{

body:
commands

}

);

console.log(
"Slash komutlar yüklendi."
);

}

catch (error) {

console.error(
error
);

}

})();