const {
EmbedBuilder,
ActionRowBuilder,
StringSelectMenuBuilder
} = require("discord.js");

const teams =
require("../data/teams");

function createMenu(
id,
placeholder,
items,
disabled = false
) {

return new ActionRowBuilder()

.addComponents(

new StringSelectMenuBuilder()

.setCustomId(id)

.setPlaceholder(
placeholder
)

.setDisabled(
disabled
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

function buildPanel(
color
) {

const embed =

new EmbedBuilder()

.setColor(
color
)

.setTitle(
"🏟️ Anadolu Takımları"
)

.setDescription(
`
Desteklediğin Anadolu takımını seç.

• Aynı anda yalnızca 1 takım rolü alınabilir
• Yeni seçim yaptığında eski takım rolün kaldırılır
`
);

return {

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

};

}

module.exports =
buildPanel;