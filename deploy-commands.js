require("dotenv").config();

const fs =
require("fs");

const {

REST,
Routes

} = require(
"discord.js"
);

const commands =
[];

const files =
fs.readdirSync(
"./commands"
);

for (
const file
of files
) {

const command =
require(
`./commands/${file}`
);

commands.push(
command.data.toJSON()
);

}

const rest =
new REST({
version:"10"
})
.setToken(
process.env.TOKEN
);

(async () => {

try {

await rest.put(

Routes.applicationCommands(

process.env.CLIENT_ID

),

{

body:
commands

}

);

console.log(
"Komutlar yüklendi."
);

}

catch(
err
) {

console.log(
err
);

}

})();