const {
ActionRowBuilder,
StringSelectMenuBuilder
} = require("discord.js");

const teams =
require("../data/teams");

module.exports =
async interaction => {

/*
SADECE DROPDOWN
*/

if (
!interaction.isStringSelectMenu()
)
return;

try {

const allTeams = [

...teams.superlig,
...teams.lig1,
...teams.lig2,
...teams.lig3

];

const selectedRoleId =
interaction.values[0];

const member =

await interaction.guild.members.fetch(
interaction.user.id
);

const selectedTeam =

allTeams.find(
t =>
t.roleId === selectedRoleId
);

if (
!selectedTeam
)
return;

/*
MENÜLER
*/

const rebuild = (
id,
placeholder,
items
) =>

new ActionRowBuilder()

.addComponents(

new StringSelectMenuBuilder()

.setCustomId(
id
)

.setPlaceholder(
placeholder
)

.addOptions(

items

.filter(
t =>
t.emoji
)

.map(
t => ({

label:
t.label,

value:
t.roleId,

emoji:{
id:t.emoji
}

})

)

)

);

await interaction.update({

components:[

rebuild(
"superlig",
"🔴 Süper Lig",
teams.superlig
),

rebuild(
"lig1",
"🟢 1. Lig",
teams.lig1
),

rebuild(
"lig2",
"🔵 2. Lig",
teams.lig2
),

rebuild(
"lig3",
"🟡 3. Lig",
teams.lig3
)

]

});

/*
AYNI ROL → KALDIR
*/

if (

member.roles.cache.has(
selectedRoleId
)

) {

await member.roles.remove(
selectedRoleId
);

return interaction.followUp({

content:
`🗑️ ${selectedTeam.label} rolü kaldırıldı.`,

flags:64

});

}

/*
ESKİ TAKIMLARI TEMİZLE
*/

const remove =

allTeams

.map(
t =>
t.roleId
)

.filter(
id =>

member.roles.cache.has(
id
)

);

if (
remove.length
) {

await member.roles.remove(
remove
);

}

await member.roles.add(
selectedRoleId
);

return interaction.followUp({

content:
`✅ ${selectedTeam.label} rolü verildi.`,

flags:64

});

}

catch (err) {

console.log(err);

try {

if (
!interaction.replied
) {

await interaction.reply({

content:
"Rol verirken hata oluştu.",

flags:64

});

}

}

catch {}

}

};