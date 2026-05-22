const {
EmbedBuilder,
ActionRowBuilder,
StringSelectMenuBuilder
} = require("discord.js");

const teams =
require("../data/teams");

const {
getConfig,
savePanelId
} =
require("../utils/panelManager");

module.exports =
async (message) => {

const config =
getConfig();

if (
message.id !==
config.panelMessageId
)
return;

const channel =

message.guild.channels.cache.get(
config.panelChannelId
);

if (!channel)
return;

const embed =

new EmbedBuilder()

.setColor(
config.embedColor
)

.setTitle(
"🏟️ Anadolu Takımları"
)

.setDescription(
"Desteklediğin Anadolu takımını seç."
);

function createMenu(
id,
placeholder,
items
) {

return new ActionRowBuilder()

.addComponents(

new StringSelectMenuBuilder()

.setCustomId(
id
)

.setPlaceholder(
placeholder
)

.addOptions(

items.map(
team => ({

label:
team.label,

value:
team.roleId,

emoji:{
id:
team.emoji
}

})

)

)

);

}

const msg =

await channel.send({

embeds:[
embed
],

components:[

createMenu(
"superlig",
"🔴 Süper Lig",
teams.superlig
),

createMenu(
"lig1",
"🟢 1. Lig",
teams.lig1
),

createMenu(
"lig2",
"🔵 2. Lig",
teams.lig2
),

createMenu(
"lig3",
"🟡 3. Lig",
teams.lig3
)

]

});

savePanelId(
msg.id
);

};