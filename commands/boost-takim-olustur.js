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
"Booster takımı öner"
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

const isim =

interaction.options.getString(
"isim"
);

await interaction.reply({

content:
`Başvuru alındı: ${isim}`,

flags:64

});

}

};