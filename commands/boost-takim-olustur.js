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
"Booster takım başvurusu oluştur"
)

.addStringOption(

option =>

option

.setName(
"isim"
)

.setDescription(
"Takım adı"
)

.setRequired(
true
)

),

async execute(
interaction
) {

try {

const takimAdi =

interaction.options.getString(
"isim"
);

const boosterRoleId =
process.env.BOOSTER_ROLE_ID;

if (
!boosterRoleId
) {

return interaction.reply({

content:
"BOOSTER_ROLE_ID tanımlanmamış.",

flags:64

});

}

const member =

await interaction.guild.members.fetch(
interaction.user.id
);

if (

!member.roles.cache.has(
boosterRoleId
)

) {

return interaction.reply({

content:
"Sadece Sponsor rolüne sahip boosterlar kullanabilir.",

flags:64

});

}

return interaction.reply({

content:

`✅ Takım başvurusu oluşturuldu.\n\nTakım: ${takimAdi}`,

flags:64

});

}

catch (err) {

console.log(
"boost hata:",
err
);

try {

if (
!interaction.replied
) {

await interaction.reply({

content:
"Bir hata oluştu.",

flags:64

});

}

}

catch {}

}

}

};