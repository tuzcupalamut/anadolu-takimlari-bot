const {
SlashCommandBuilder,
EmbedBuilder,
ActionRowBuilder,
StringSelectMenuBuilder,
PermissionFlagsBits
} = require("discord.js");

const teams =
require("../data/teams");

const {
getConfig,
savePanelId
} =
require("../utils/panelManager");

module.exports = {

data:
new SlashCommandBuilder()

.setName(
"takim-panel"
)

.setDescription(
"Takım seçim paneli"
)

/*
Sadece yönetici görebilsin
*/
.setDefaultMemberPermissions(
PermissionFlagsBits.Administrator
),

async execute(interaction) {

if (

!interaction.member.permissions.has(
PermissionFlagsBits.Administrator
)

) {

return interaction.reply({

content:
"Bu komutu yalnızca yöneticiler kullanabilir.",

flags:64

});

}

const config =
getConfig();

if (
interaction.channel.id
!== config.panelChannelId
) {

return interaction.reply({

content:
"Bu komut yalnızca panel kanalında kullanılabilir.",

flags:64

});

}

const embed =

new EmbedBuilder()

.setColor(
config.embedColor
)

.setTitle(
"🏟️ Anadolu Takımları"
)

.setDescription(
`
Desteklediğin Anadolu takımını seç.

• Aynı anda yalnızca 1 takım rolü alınabilir
• Aynı takımı tekrar seçersen rol kaldırılır
• Yeni seçim yaptığında eski takım rolün kaldırılır
`
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

const rows = [

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

];

if (
config.panelMessageId
) {

try {

const oldMessage =

await interaction.channel.messages.fetch(
config.panelMessageId
);

await oldMessage.edit({

embeds:[
embed
],

components:
rows

});

return interaction.reply({

content:
"Panel güncellendi.",

flags:64

});

}

catch {}

}

await interaction.reply({

embeds:[
embed
],

components:
rows

});

const msg =
await interaction.fetchReply();

savePanelId(
msg.id
);

}

};