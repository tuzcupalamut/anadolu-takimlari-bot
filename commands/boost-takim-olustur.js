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

const isim =

interaction.options.getString(
"isim"
);

const boosterRole =

process.env
.BOOSTER_ROLE_ID;

const member =
interaction.member;

if (

!member.roles.cache.has(
boosterRole
)

) {

return interaction.reply({

content:
"Bu sistemi yalnızca sunucu boosterlari kullanabilir.",

flags:64

});

}

await interaction.reply({

content:
`🏟️ Takım başvurun alındı: ${isim}\n\nYönetici onayı bekleniyor.`,

flags:64

});

}

};