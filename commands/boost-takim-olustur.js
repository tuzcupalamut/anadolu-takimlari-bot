const {
SlashCommandBuilder
} = require("discord.js");

module.exports = {

data:

new SlashCommandBuilder()

.setName(
"boost-takim-olustur"
)

.setDescription(
"Booster takımı oluştur"
)

.addStringOption(

option =>

option

.setName(
"isim"
)

.setDescription(
"Oluşturmak istediğin takım"
)

.setRequired(
true
)

),

async execute(
interaction
) {

await interaction.deferReply({
flags:64
});

const isim =
interaction.options.getString(
"isim"
);

const member =
await interaction.guild.members.fetch(
interaction.user.id
);

const boosterRole =
process.env.BOOSTER_ROLE_ID;

console.log(
"BOOSTER_ROLE_ID:",
boosterRole
);

console.log(
"Kullanıcı rolleri:",
member.roles.cache.map(
r => `${r.name} (${r.id})`
));

if (
!member.roles.cache.has(
boosterRole
)
) {

return interaction.editReply({

content:
"Bu sistemi yalnızca sunucu boosterları kullanabilir."

});

}

await interaction.editReply({

content:
`🏟️ Takım başvurun alındı: ${isim}\n\nYönetici onayı bekleniyor.`

});

}

};